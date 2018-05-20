import createCrudState from 'state/utils/createCrudState';

const initialState = {
  label: '',
  row: 0,
  dateFormat: 'DDMMYYYY',
  schema: {
    date: undefined,
    amount: undefined,
    reference: undefined,
    accountName: undefined,
    particulars: undefined,
    code: undefined,
  },
};

export const { actions: dataActions, reducer: dataReducer } = createCrudState('schemas', initialState);
