import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function add(params) {
  return request('/api/users', {
    method: 'POST',
    body: params,
  });
}
export async function edit(params) {
  return request(`/api/users/${params.userId}`, {
    method: 'PUT',
    body: params,
  });
}
export async function lock(userId) {
  return request(`/api/users/${userId}/lock`, {
    method: 'PUT',
  });
}
export async function unlock(userId) {
  return request(`/api/users/${userId}/enable`, {
    method: 'PUT',
  });
}
export async function remove(userId) {
  return request(`/api/users/${userId}`, {
    method: 'DELETE',
  });
}
export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  }, true);
}
