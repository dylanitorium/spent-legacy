import { where } from 'view/utils/arrayUtils';

export const appActionTypes = {
  TOGGLE_EXCLUDE_EXPENSE: 'spent/app/expenses/exclude',
};

export const appActions = {
  toggleExclude: id => ({
    type: appActionTypes.TOGGLE_EXCLUDE_EXPENSE,
    id,
  }),
}

const initialAppState = {
  excluded: [],
};

export const appReducer = (state = initialAppState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case appActionTypes.TOGGLE_EXCLUDE_EXPENSE:
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
