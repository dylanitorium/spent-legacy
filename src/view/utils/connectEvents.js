import { connect } from 'react-redux';
import { actions as eventActions } from 'state/modules/events';

const connectEvents = (selectors, actions, Component) => {
  const mapStateToProps = () => {
    return (state, props) => ({
      reconciledItems: selectors.reconciledItemsEventsSelector(state, props),
      unreconciledItems: selectors.unreconciledItemsEventsSelector(state, props),
    });
  };

  const mapDispatchToProps = {
    createEvent: actions.createWithBudgetId,
    createEventsFromImport: eventActions.createEventsFromImport
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default connectEvents;
