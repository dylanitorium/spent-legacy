import makeCreateWithBudgetId from 'state/utils/makeCreateWithBudgetId';
import { dataActions } from './data';
export { dataReducer } from './data';

export const actions = {
  ...dataActions,
  createExpenseWithBudgetId: makeCreateWithBudgetId(dataActions),
};;
