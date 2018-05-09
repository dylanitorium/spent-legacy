import { expenseEventSelectors, expenseSelectors } from 'state/selectors';
import { actions as expenseEventActions } from 'state/modules/expenseEvents';
import connectEventItem from 'view/utils/connectEventItem';

export default connectEventItem({ ...expenseEventSelectors, ...expenseSelectors }, expenseEventActions);
