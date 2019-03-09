import { queryOrders, checkOrder, refundOrder, cancelOrder } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'order',

  state: {
    orders: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(queryOrders);
      if (res) {
        yield put({
          type: 'saveOrders',
          payload: res.data,
        });
      }
    },
    *query({ payload }, { call }) {
      const res = yield call(checkOrder, payload);
      if (res) {
        console.log(res.data);
        message.success(`use UQPAY API query order success, order state ${res.data.state}`);
      }
    },
    *cancel({ payload }, { call }) {
      const res = yield call(cancelOrder, payload);
      if (res) {
        console.log(res.data);
        message.success(`use UQPAY API cancel order done, order state ${res.data.state}`);
      }
    },
    *refund({ payload }, { call }) {
      const res = yield call(refundOrder, payload);
      if (res) {
        console.log(res.data);
        message.success(`use UQPAY API refund order done, order state ${res.data.state}`);
      }
    },
  },

  reducers: {
    saveOrders(state, { payload }) {
      return {
        ...state,
        orders: payload,
      }
    }
  }

}
