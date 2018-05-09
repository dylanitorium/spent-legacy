import { incomeSelectors } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';
import connectItem from 'view/utils/connectItem';

export default connectItem(incomeSelectors, incomesActions);
