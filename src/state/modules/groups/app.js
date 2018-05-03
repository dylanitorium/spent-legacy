import { where } from 'view/utils/arrayUtils';

export const appActionTypes = {
  TOGGLE_EXCLUDE_GROUP: 'spent/app/groups/exclude',
};

export const appActions = {
  toggleExcludeGroup: id => ({
    type: appActionTypes.TOGGLE_EXCLUDE_GROUP,
    id,
  }),
}

const initialAppState = {
  excludedGroups: [],
};

export const appReducer = (state = initialAppState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case appActionTypes.TOGGLE_EXCLUDE_GROUP:
      let { excludedGroups } = state;
      if (excludedGroups.includes(payload.id)) {
        excludedGroups = excludedGroups.filter(where().value.isNot(payload.id));
      } else {
        excludedGroups = [...excludedGroups, payload.id];
      }

      return {
        ...state,
        excludedGroups,
      };
    default:
      return state;
  }
}
