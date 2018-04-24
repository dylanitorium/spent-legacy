import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  namespace: '',
  budgetId: 0,
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('groups', initialState);
