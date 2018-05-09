import { connect } from 'react-redux';
import EventItem from 'view/components/pure/EventTable/EventItem';

const connectEventItem = (selectors, actions) => {
  const mapStateToProps = () => {
    const itemEventSelector = selectors.makeItemEventSelector();
    return (state, props) => ({
      ...itemEventSelector(state, props),
      itemOptions: selectors.itemMapSelector(state),
    });
  }

  const mapDispatchToProps = {
    updateItem: actions.update,
    deleteItem: actions.delete,
  }

  return connect(mapStateToProps, mapDispatchToProps)(EventItem);
};

export default connectEventItem;
