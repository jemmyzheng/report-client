import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function accountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  }, true);
}

export async function register(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  }, true);
}

export async function submitPayOrder(order) {
  return request('/api/order', {
    method: 'POST',
    body: order,
  });
}

export async function updatePayOrder(order) {
  return request(`/api/order`, {
    method: 'PUT',
    body: order,
  })
}

export async function queryPayMethods() {
  return request('/api/methods');
}

export async function queryBanksBy(methodId, merchantId) {
  return request(`/api/cards?methodId=${methodId}&merchantId=${merchantId}`);
}
export async function verifyPhone(params) {
  return request('/api/enroll/verify', {
    method: 'POST',
    body: params,
  }, true);
}
export async function hostBankCard(bankCard) {
  return request('/api/enroll', {
    method: 'POST',
    body: bankCard,
  }, true);
}
export async function pay(payOpt) {
  return request('/api/pay', {
    method: 'POST',
    body: payOpt,
  }, true);
}

export async function queryOrders() {
  return request('/api/order')
}

export async function checkOrder(orderId) {
  return request(`/api/query/${orderId}`, {
    method: 'POST',
  })
}

export async function refundOrder(orderId) {
  return request(`/api/refund/${orderId}`, {
    method: 'POST',
  });
}

export async function cancelOrder(orderId) {
  return request(`/api/cancel/${orderId}`, {
    method: 'POST',
  });
}

export async function fetchTestEmvcQR() {
  return request('/api/union/qr', {
    method: 'POST',
  })
}

export async function emvcConsumerPay(payOpt) {
  return request('/api/union/consumer/pay', {
    method: 'POST',
    body: payOpt,
  }, true);
}
