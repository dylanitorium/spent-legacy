import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  budgetId: null,
  incomeId: null,
  amount: 0,
  date: '',
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('incomeEvents', initialState);
