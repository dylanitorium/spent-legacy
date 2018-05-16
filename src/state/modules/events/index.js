import { actions as incomeActions } from 'state/modules/incomeEvents';
import { actions as expenseActions } from 'state/modules/expenseEvents';
import { where } from 'view/utils/arrayUtils';

export const actions = {
  createEventsFromImport: importedData => (
    (dispatch, getState) => {
      const incomeData = importedData.filter(where('amount').isPositive);
      const expenseData = importedData.filter(where('amount').isNegative);
      // console.log(importedData);
      console.log(incomeData);
      console.log(expenseData);


      incomeData.forEach(itemEvent => dispatch(incomeActions.createWithBudgetId(itemEvent)));
      expenseData.forEach(itemEvent => dispatch(expenseActions.createWithBudgetId(itemEvent)));
    }
  ),
}