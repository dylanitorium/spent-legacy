import { incomeSelectors, groupSelectors } from 'state/selectors';
import { actions as groupActions } from 'state/modules/groups';
import { actions as incomeActions } from 'state/modules/incomes';
import connectItemGroup from 'view/utils/connectItemGroup';

export default connectItemGroup(incomeSelectors, groupSelectors, incomeActions, groupActions);
