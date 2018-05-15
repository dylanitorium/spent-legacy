import { trackingPeriodSelector, incomeTrackingSelectors, } from 'state/selectors';
import { actions } from 'state/modules/tracking';
import connectTracking from 'view/utils/connectTracking';
import IncomeTracking from 'view/components/pure/IncomeTracking';

const selectors = { ...incomeTrackingSelectors, trackingPeriodSelector };
export default connectTracking(selectors, actions, IncomeTracking);