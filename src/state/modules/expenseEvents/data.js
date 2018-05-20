import createCrudState from 'state/utils/createCrudState';

const initialState = {
  reference: '',
  accountName: '',
  particulars: '',
  code: '',
  budgetId: null,
  itemId: null,
  amount: 0,
  date: '',
  reconciled: false,
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('expenseEvents', initialState);
