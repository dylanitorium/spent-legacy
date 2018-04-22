import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  amount: 0,
  frequency: '',
  budgetId: '',
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('incomes', initialState);
