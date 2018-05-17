export const appActionTypes = {
  SET_ACTIVE_SCHEMA: 'spent/app/schemas/set'
};

export const appActions = {
  setActiveSchema: schema => ({
    type: appActionTypes.SET_ACTIVE_SCHEMA,
    schema,
  })
};

const initialAppState = {
  activeSchema: '',
};

export const appReducer = (state = initialAppState, action) => {
  const { type } = action

  switch (type) {
    case appActionTypes.SET_ACTIVE_SCHEMA:
      return {
        ...state,
        activeSchema: action.schema,
      };
    default:
      return state;
  }
}
