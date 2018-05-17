import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  row: 0,
  schema: {},
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('schemas', initialState);
