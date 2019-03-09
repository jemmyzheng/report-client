import { register } from '@/services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    message: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.success ? "ok" : 'error',
        message: payload.data
      };
    },
    clear(state) {
      return {
        ...state,
        status: undefined,
        message: undefined,
      }
    }
  },
};
