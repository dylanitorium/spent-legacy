import { connect } from 'react-redux';
import { trackingPeriodSelector, incomeTrackingSelectors, expenseTrackingSelectors,  } from 'state/selectors';
import { actions as trackingActions } from 'state/modules/tracking';
import Tracking from 'view/components/pure/Tracking';

const mapStateToProps = () => {
  const incomeTracksSelector = incomeTrackingSelectors.makeItemTracksSelector();
  return (state, props) => ({
    trackingPeriod: trackingPeriodSelector(state),
    incomeTracks: incomeTracksSelector(state),
  });
}

const mapDispatchToProps = {
  updatePeriod: trackingActions.setTrackingPeriod,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);
