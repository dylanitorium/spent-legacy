import { where } from 'view/utils/arrayUtils';

export const appActionTypes = {
  TOGGLE_EXCLUDE_INCOME: 'spent/app/incomes/exclude',
};

export const appActions = {
  toggleExcludeIncome: id => ({
    type: appActionTypes.TOGGLE_EXCLUDE_INCOME,
    id,
  }),
}

const initialAppState = {
  excludedIncomes: [],
};

export const appReducer = (state = initialAppState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case appActionTypes.TOGGLE_EXCLUDE_INCOME:
      let { excludedIncomes } = state;
      if (excludedIncomes.includes(payload.id)) {
        excludedIncomes = excludedIncomes.filter(where().value.isNot(payload.id));
      } else {
        excludedIncomes = [...excludedIncomes, payload.id];
      }

      return {
        ...state,
        excludedIncomes,
      };
    default:
      return state;
  }
}
