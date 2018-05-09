import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  budgetId: null,
  expenseId: null,
  amount: 0,
  date: '',
  reconciled: false,
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('expenseEvents', initialState);
