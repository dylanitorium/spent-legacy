const appActionTypes = {
  SET_ACTIVE_BUDGET: 'spent/app/budgets/set',
};

const initialAppState = {
  activeBudgetId: 0,
};

export const appActions = {
  setActiveBudget: (budgetId) => ({
    type: appActionTypes.SET_ACTIVE_BUDGET,
    budgetId,
  }),
};

export const appReducer = (state = initialAppState, action) => {
  const { type } = action;

  switch (type) {
    case appActionTypes.SET_ACTIVE_BUDGET:
      return {
        ...state,
        activeBudgetId: action.budgetId,
      }
    default:
      return state;
  }
};
