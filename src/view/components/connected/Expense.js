import { expenseSelectors } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';
import connectItem from 'view/utils/connectItem';

export default connectItem(expenseSelectors, expensesActions);
