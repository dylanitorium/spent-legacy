import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  budgetId: 0,
  groupId: 0,
};

export const { actions, actionTypes, reducer } = createCrudState('categories', initialState);
