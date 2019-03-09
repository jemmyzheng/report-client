import { message } from 'antd';
import { queryCurrent, query, add, edit, lock, unlock, remove } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      if (res) {
        yield put({
          type: 'saveCurrentUser',
          payload: res.data,
        });
      }
    },
    *queryAllUser(_, { call, put }) {
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
          type: 'queryAllUser',
        });
      }
    },
    *edit({ payload }, { call, put }) {
      const res = yield call(edit, payload);
      if (res && res.success) {
        message.success('编辑成功');
        yield put({
          type: 'queryAllUser',
        });
      }
    },
    *lock({ payload }, { call, put }) {
      const res = yield call(lock, payload);
      if (res && res.success) {
        message.success('锁定成功');
        yield put({
          type: 'queryAllUser',
        });
      }
    },
    *unlock({ payload }, { call, put }) {
      const res = yield call(unlock, payload);
      if (res && res.success) {
        message.success('解锁成功');
        yield put({
          type: 'queryAllUser',
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const res = yield call(remove, payload);
      if (res && res.success) {
        message.success('删除成功');
        yield put({
          type: 'queryAllUser',
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
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },

  },
};
