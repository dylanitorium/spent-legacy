import { actions as incomeActions } from 'state/modules/incomeEvents';
import { actions as expenseActions } from 'state/modules/expenseEvents';
import { where, call } from 'view/utils/arrayUtils';
import moment from 'moment';

export const actions = {
  createEventsFromImport: importedData => (
    (dispatch, getState) => {
      const incomeData = importedData.filter(where('amount').isPositive);
      const expenseData = importedData.filter(where('amount').isNegative);

      const formatAmount = amount => parseInt(amount, 10);
      const formatDate = date => moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');


      incomeData
        .map(call(formatAmount).on('amount'))
        .map(call(formatDate).on('date'))
        .forEach(itemEvent => dispatch(incomeActions.createWithBudgetId(itemEvent)));
      expenseData
        .map(call(formatAmount).on('amount'))
        .map(call(formatDate).on('date'))
        .map().forEach(itemEvent => dispatch(expenseActions.createWithBudgetId(itemEvent)));
    }
  ),
}