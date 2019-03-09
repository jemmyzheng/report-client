import { stringify } from 'qs';
import request from '@/utils/request';

export async function query() {
  return request('/api/reports?deptId=0');
}

export async function add(params) {
  return request('/api/reports', {
    method: 'POST',
    body: params,
  });
}
export async function edit(params) {
  return request(`/api/reports/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function detail(id) {
  return request(`/api/reports/${id}`);
}

export async function remove(id) {
  return request(`/api/reports/${id}`, {
    method: 'DELETE',
  });
}

export async function setFields(params) {
  return request(`/api/reports/${params.reportId}/fields`, {
    method: 'PUT',
    body: params,
  });
}

export async function rmField(params) {
  return request(`/api/reports/${params.reportId}/fields`, {
    method: 'DELETE',
    body: params,
  });
}
export async function getFields(reportId) {
  return request(`/api/reports/${reportId}/fields`);
}

export async function currentReports() {
  return request('/api/current/reports');
}

export async function inputReport(params) {
  return request(`/api/reports/${params.reportId}/values`, {
    method: 'POST',
    body: params,
  });
}

export async function editReportValue(params) {
  return request(`/api/reports/${params.reportId}/values`, {
    method: 'PUT',
    body: params,
  });
}
export async function queryReportValue(params) {
  return request(`/api/reports/values?${stringify(params)}`);
}
