const makeReducer = (initialState, handlers, name) => (
  (state = initialState, action) => {
    const { type } = action;

    const stateInContext = name ? state[name] : state;

    if (!handlers[type]) {
      return stateInContext;
    }

    return {
      ...stateInContext,
      ...handlers[type](state, action),
    };
  }
);

export default makeReducer;
