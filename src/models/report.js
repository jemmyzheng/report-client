import {
  query,
  add,
  edit,
  detail,
  remove,
  setFields, rmField,
  currentReports, queryReportValue, inputReport, editReportValue } from '@/services/report';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'report',

  state: {
    list: [],
    target: {},
    currentReports: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
    },
    query: {},
    history: [],
    editData: null,
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
    },
    *detail({ payload }, { call, put }) {
      const res = yield call(detail, payload);
      if (res && res.success) {
        yield put({
          type: 'saveDetail',
          payload: res.data,
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const res = yield call(remove, payload);
      if (res && res.success) {
        message.success('删除成功');
        yield put(routerRedux.replace('/reports'));
      }
    },
    *setFields({ payload }, { call, put }) {
      const res = yield call(setFields, payload);
      if (res && res.success) {
        message.success('编辑成功');
        yield put({
          type: 'detail',
          payload: payload.reportId,
        });
      }
    },
    *rmField({ payload }, { call, put }) {
      const res = yield call(rmField, payload);
      if (res && res.success) {
        message.success('编辑成功');
        yield put({
          type: 'detail',
          payload: payload.reportId,
        });
      }
    },
    *queryCurrent(_, { call, put }) {
      const res = yield call(currentReports);
      if (res) {
        yield put({
          type: 'saveCurrentReports',
          payload: res.data,
        });
      }
    },
    *inputData({ payload }, { call, put }) {
      const res = yield call(inputReport, payload);
      if (res && res.success) {
        message.success('录入成功');
        yield put({
          type: 'changeQuery',
          payload: {
            reportId: [payload.reportId],
            airportId: payload.airportId
          }
        });
        yield put(routerRedux.replace('/history'));
      }
    },
    *editData({ payload }, { call, put }) {
      const res = yield call(editReportValue, payload);
      if (res && res.success) {
        message.success('修改成功');
        yield put({
          type: 'cleanEditData',
        });
        yield put({
          type: 'changeQuery',
          payload: {
            reportId: [payload.reportId],
            airportId: payload.airportId
          }
        });
        yield put(routerRedux.replace('/history'));
      }
    },
    *queryHistory({ payload: { query: q, pagination } }, { call, put }) {
      const res = yield call(queryReportValue, { ...q, ...pagination });
      if (res && res.success) {
        yield put({
          type: 'saveHistory',
          payload: {
            q,
            pagination,
            data: res.data,
          },
        });
      }
    },
    *jump2history({ payload }, { put }) {
      yield put({
        type: 'changeQuery',
        payload: {
          reportId: [payload]
        }
      });
      yield put(routerRedux.replace('/history'));
    },
    *jump2editValue({ payload }, { put }) {
      yield put({
        type: 'ready2editValue',
        payload,
      });
      yield put(routerRedux.replace(`/input/${payload.reportId}`));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentReports(state, action) {
      return {
        ...state,
        currentReports: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        target: action.payload,
      };
    },
    changeQuery(state, action) {
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload,
        },
      }
    },
    saveHistory(state, action) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination,
          total: action.payload.data.total,
        },
        query: {
          ...state.query,
          ...action.payload.q,
        },
        history: action.payload.data.dataList,
      };
    },
    ready2editValue(state, action) {
      return {
        ...state,
        editData: action.payload,
      };
    },
    cleanEditData(state) {
      return {
        ...state,
        editData: null,
      }
    }
  },
};
