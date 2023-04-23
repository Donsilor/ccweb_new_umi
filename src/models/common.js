import menus from '@/routers/menu';
import Dict from '@/utils/dict';
let inIframe = false;
try {
  if (self !== top) {
    inIframe = true;
  }
} catch (error) {
  console.error('判断是否在iframe中失败', error.message);
}

export default {
  namespace: 'common',
  state: {
    isLogin: null,
    inIframe,
    menus,
    userInfo: {},
  },
  reducers: {
    updateLoginStatus(state, { payload }) {
      return {
        ...state,
        isLogin: !!payload,
      };
    },
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
  effects: {
    *init({ payload }, { call, put }) {
      try {
        const response = yield call(() => httpCommonClient.post('/UserAction_getStore'));
        if (response.status === 401) {
          return;
        }
        yield put({ type: 'updateUserInfo', payload: response.data.data });
        yield put({ type: 'updateLoginStatus', payload: true });
        Dict.init();
      } catch (error) {
        message.warn('系统异常，请稍后再试');
      }
    },
  },
};
