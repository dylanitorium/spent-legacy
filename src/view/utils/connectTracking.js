import { connect } from 'react-redux';

const connectTracking = (selectors, actions, component) => {
  const mapStateToProps = () => {
    const itemTracksSelector = selectors.makeItemTracksSelector();

    return (state, props) => ({
      trackingPeriod: selectors.trackingPeriodSelector(state),
      tracks: itemTracksSelector(state),
    });
  }

  const mapDispatchToProps = {
    updatePeriod: actions.setTrackingPeriod,
  }

  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default connectTracking;