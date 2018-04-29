import createCrudState from 'state/utils/createCrudState';
import { FREQUENCY_MAP } from 'state/constants';

const initialState = {
  label: '',
  budgetId: null,
  categoryId: null,
  groupId: null,
  frequency: FREQUENCY_MAP.YEAR,
  amount: 0
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('expenses', initialState);
