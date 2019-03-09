import { query, add, edit } from '@/services/dept';
import { message } from 'antd/lib/index';

export default {
  namespace: 'dept',

  state: {
    list: [],
  },

  effects: {
    *queryAll(_, { call, put }) {
      const res = yield call(query);
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
      }
    },
    *add({ payload }, { call, put }) {
      const res = yield call(add, payload);
      if (res && res.success) {
        message.success('添加成功');
        yield put({
          type: 'queryAll',
        });
      }
    },
    *edit({ payload }, { call, put }) {
      const res = yield call(edit, payload);
      if (res && res.success) {
        message.success('编辑成功');
        yield put({
          type: 'queryAll',
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
