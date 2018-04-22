import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  budgetId: 0,
};

export const { actions, actionTypes, reducer: dataReducer } = createCrudState('incomes', initialState);
