import createCrudState from 'state/utils/createCrudState';

const initialDataState = { label: '' };
export const { actions: dataActions, reducer: dataReducer } = createCrudState('budgets', initialDataState);
