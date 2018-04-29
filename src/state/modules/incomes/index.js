import makeCreateWithBudgetId from 'state/utils/makeCreateWithBudgetId';
import { dataActions } from './data';
export { dataReducer } from './data';

export const actions = {
  ...dataActions,
  createIncomeWithBudgetId: makeCreateWithBudgetId(dataActions)
};;
