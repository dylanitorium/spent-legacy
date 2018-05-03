import makeCreateWithBudgetId from 'state/utils/makeCreateWithBudgetId';
import { dataActions } from './data';
import { appActions } from './app';
export { dataReducer } from './data';
export { appReducer } from './app';

export const actions = {
  ...dataActions,
  ...appActions,
  createIncomeWithBudgetId: makeCreateWithBudgetId(dataActions)
};;
