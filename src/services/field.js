import request from '@/utils/request';

export async function query() {
  return request('/api/fields');
}
export async function queryCurrent() {
  return request('/api/current/fields');
}

export async function add(params) {
  return request('/api/fields', {
    method: 'POST',
    body: params,
  });
}
export async function edit(params) {
  return request(`/api/fields/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

