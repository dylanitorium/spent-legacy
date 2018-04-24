import makeCreateAmountableWithBudgetId from 'state/utils/makeCreateAmountableWithBudgetId';
import { dataActions } from './data';
export { dataReducer } from './data';

export const actions = {
  ...dataActions,
  createIncomeWithBudgetId: makeCreateAmountableWithBudgetId('incomes', 'Item', dataActions)
};;
