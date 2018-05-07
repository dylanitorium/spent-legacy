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
  excluded: [],
};

export const appReducer = (state = initialAppState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case appActionTypes.TOGGLE_EXCLUDE_INCOME:
      let { excluded } = state;
      if (excluded.includes(payload.id)) {
        excluded = excluded.filter(where().value.isNot(payload.id));
      } else {
        excluded = [...excluded, payload.id];
      }

      return {
        ...state,
        excluded,
      };
    default:
      return state;
  }
}
