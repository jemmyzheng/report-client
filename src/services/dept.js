import request from '@/utils/request';

export async function query() {
  return request('/api/depts');
}

export async function add(params) {
  return request('/api/depts', {
    method: 'POST',
    body: params,
  });
}
export async function edit(params) {
  return request(`/api/depts/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

