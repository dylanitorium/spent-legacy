import { incomeEventSelectors, incomeSelectors } from 'state/selectors';
import { actions as incomeEventActions } from 'state/modules/incomeEvents';
import connectEventItem from 'view/utils/connectEventItem';

export default connectEventItem({ ...incomeEventSelectors, ...incomeSelectors }, incomeEventActions);
