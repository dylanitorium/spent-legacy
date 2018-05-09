import { FREQUENCY_MAP } from 'state/constants';

const appActionTypes = {
  SET_ACTIVE_BUDGET: 'spent/app/budgets/set/active',
  SET_FREQUENCY: 'spent/app/budgets/set/frequency',
};

const initialAppState = {
  activeBudgetId: 0,
  overviewFrequency: FREQUENCY_MAP.YEAR
};

export const appActions = {
  setActiveBudget: (budgetId) => ({
    type: appActionTypes.SET_ACTIVE_BUDGET,
    budgetId,
  }),
  setFrequency: (frequency) => ({
    type: appActionTypes.SET_FREQUENCY,
    frequency,
  })
};

export const appReducer = (state = initialAppState, action) => {
  const { type } = action;

  switch (type) {
    case appActionTypes.SET_ACTIVE_BUDGET:
      return {
        ...state,
        activeBudgetId: action.budgetId,
      }
    case appActionTypes.SET_FREQUENCY:
      return {
        ...state,
        overviewFrequency: action.frequency,
      }
    default:
      return state;
  }
};
