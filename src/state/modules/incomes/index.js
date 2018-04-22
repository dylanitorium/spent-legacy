import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  amount: 0,
  frequency: '',
  budgetId: '',
};

export const { actions, actionTypes, reducer: dataReducer } = createCrudState('incomes', initialState);
