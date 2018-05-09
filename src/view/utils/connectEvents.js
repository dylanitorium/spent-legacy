import { connect } from 'react-redux';

const connectEvents = (selectors, actions, Component) => {
  const mapStateToProps = () => {
    return (state, props) => ({
      reconciledItems: selectors.reconciledItemsEventsSelector(state, props),
      unreconciledItems: selectors.unreconciledItemsEventsSelector(state, props),
    });
  };

  const mapDispatchToProps = {
    createEvent: actions.createWithBudgetId,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default connectEvents;
