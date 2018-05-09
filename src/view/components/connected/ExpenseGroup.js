import { expenseSelectors, groupSelectors } from 'state/selectors';
import { actions as groupActions } from 'state/modules/groups';
import { actions as expenseActions } from 'state/modules/expenses';
import connectItemGroup from 'view/utils/connectItemGroup';

export default connectItemGroup(expenseSelectors, groupSelectors, expenseActions, groupActions);
