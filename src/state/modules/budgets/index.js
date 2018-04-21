import createCrudState from 'state/utils/createCrudState';
import * as thunkActions from './thunks';

const initialState = {
  label: '',
};

const state = createCrudState('budgets', initialState);

export const { actionTypes, reducer } = state;

export const actions = {
  ...state.actions,
  ...thunkActions,
};

export const CONSTANTS = {
  DEFAULT_BUDGET_NAME: 'My Budget'
};
