import { FREQUENCY_MAP } from 'state/constants';
import { dataActions } from './data';
export { dataReducer } from './data';

export const actions = {
  ...dataActions,
  createIncomeWithBudgetId: data => (
    (dispatch, getState) => {
      const {
        app: {
          budgets: {
            activeBudgetId
          }
        },
        data: {
          incomes: {
            index
          }
        }
      } = getState();

      dispatch(dataActions.create({
        label: data.label || `Income ${index + 1}`,
        amount: parseInt(data.amount, 2) || 0,
        frequency: data.frequency || FREQUENCY_MAP.YEAR,
        budgetId: activeBudgetId,
      }));
    }
  ),
};;
