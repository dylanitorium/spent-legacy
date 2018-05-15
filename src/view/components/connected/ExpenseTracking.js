import { trackingPeriodSelector, expenseTrackingSelectors, } from 'state/selectors';
import { actions } from 'state/modules/tracking';
import connectTracking from 'view/utils/connectTracking';
import ExpenseTracking from 'view/components/pure/ExpenseTracking';

const selectors = { ...expenseTrackingSelectors, trackingPeriodSelector };
export default connectTracking(selectors, actions, ExpenseTracking);