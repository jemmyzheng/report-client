import { query, add, edit, queryCurrent } from '@/services/field';
import { message } from 'antd/lib/index';

export default {
  namespace: 'field',

  state: {
    list: [],
    map: {},
    current: [],
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
    *queryCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      if (res) {
        yield put({
          type: 'saveCurrent',
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
      const map = {};
      action.payload.forEach(f => {
        map[f.id] = f;
        return 1;
      });
      return {
        ...state,
        list: action.payload,
        map,
      };
    },
    saveCurrent(state, action) {
      const map = {};
      action.payload.forEach(f => {
        map[f.id] = f;
        return 1;
      });
      return {
        ...state,
        current: action.payload,
        map,
      };
    }
  },
};
