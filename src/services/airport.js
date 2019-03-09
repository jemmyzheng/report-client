import request from '@/utils/request';

export async function query() {
  return request('/api/airports');
}

export async function add(params) {
  return request('/api/airports', {
    method: 'POST',
    body: params,
  });
}
export async function edit(params) {
  return request(`/api/airports/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

