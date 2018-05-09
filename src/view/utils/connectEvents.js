import { connect } from 'react-redux';

const connectEvents = (selectors, actions, Component) => {
  const mapStateToProps = () => {
    return (state, props) => ({
      items: selectors.itemEventsSelector(state, props),
    });
  };

  const mapDispatchToProps = {
    createEvent: actions.createWithBudgetId,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default connectEvents;
