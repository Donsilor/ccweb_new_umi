export default {
  namespace: 'form',
  state: {
    value: {},
  },
  reducers: {
    updateQuery(state, { payload }) {
      const { formKey, value } = payload;
      if (typeof formKey !== 'string' || formKey.length === 0) {
        return { ...state };
      } else {
        return {
          ...state,
          value: {
            ...state.value,
            [formKey]: value,
          },
        };
      }
    },
  },
};
