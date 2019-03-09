import fetch from 'dva/fetch';
import { notification } from 'antd';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = response.statusText;
  const error = new Error(errorText);
  error.httpStatus = response.status;
  error.url = response.url;
  error.response = response;
  throw error;
}

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option, skipError) {
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (response.status === 204) {
        return response.text();
      }
      return response.json();
    }).then((result) => {
      if (result.success || skipError) {
        return result;
      }
      const error = new Error(result.data);
      error.httpStatus = 200;
      error.url = url;
      throw error;
    })
    .catch(e => {
      const status = e.httpStatus;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
      if (status <= 504 && status >= 500) {
        notification.error({
          message: `Catch Error ${status}: ${e.url}`,
          description: e.message,
        });
      }
      if (status === 400) {
        console.error(e.message); // eslint-disable-inline
      }
      if (status >= 200 && status < 300) {
        notification.error({
          message: `Action Failed: ${e.url}`,
          description: e.message,
        });
      }
    });
}
