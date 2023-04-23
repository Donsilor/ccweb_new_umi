export default {
  namespace: 'table',
  state: {
    paging: {},
  },
  reducers: {
    updatePaging(state, { payload }) {
      const { tableKey, current, pageSize, total, search } = payload;
      if (typeof tableKey !== 'string' || tableKey.length === 0) {
        return { ...state };
      } else {
        return {
          ...state,
          paging: {
            ...state.paging,
            [tableKey]: {
              current,
              pageSize,
              total,
              search,
            },
          },
        };
      }
    },
  },
};
