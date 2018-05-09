import { incomeEventSelectors } from 'state/selectors';
import { actions as incomeEventActions } from 'state/modules/incomeEvents';
import IncomeEvents from 'view/components/pure/IncomeEvents';
import connectEvents from 'view/utils/connectEvents';

export default connectEvents(incomeEventSelectors, incomeEventActions, IncomeEvents);
