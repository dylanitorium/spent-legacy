import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  budgetId: 0,
  categoryId: 0,
  groupId: 0,
  frequency: '',
  amount: 0
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('expenses', initialState);
