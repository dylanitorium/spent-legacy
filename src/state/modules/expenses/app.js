import { where } from 'view/utils/arrayUtils';

export const appActionTypes = {
  TOGGLE_EXCLUDE_EXPENSE: 'spent/app/expenses/exclude',
};

export const appActions = {
  toggleExcludeExpense: id => ({
    type: appActionTypes.TOGGLE_EXCLUDE_EXPENSE,
    id,
  }),
}

const initialAppState = {
  excludedExpenses: [],
};

export const appReducer = (state = initialAppState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case appActionTypes.TOGGLE_EXCLUDE_EXPENSE:
      let { excludedExpenses } = state;
      if (excludedExpenses.includes(payload.id)) {
        excludedExpenses = excludedExpenses.filter(where().value.isNot(payload.id));
      } else {
        excludedExpenses = [...excludedExpenses, payload.id];
      }

      return {
        ...state,
        excludedExpenses,
      };
    default:
      return state;
  }
}
