import { connect } from 'react-redux';
import Item from 'view/components/pure/ItemTable/Item';
import { FREQUENCY_OPTIONS } from 'state/constants';

const connectItem = (selectors, actions) => {
  const mapStateToProps = () => {
    const itemSelector = selectors.makeItemSelector();
    const isItemExcludedSelector = selectors.makeIsItemExcludedSelector();
    const isGroupExcludedByItemIdSelector = selectors.makeIsGroupExcludedByItemIdSelector();
    return (state, props) => ({
      ...itemSelector(state, props),
      excluded: isItemExcludedSelector(state, props),
      groupExcluded: isGroupExcludedByItemIdSelector(state, props),
      frequencyOptions: FREQUENCY_OPTIONS,
    });
  };

  const mapDispatchToProps = {
    updateItem: actions.update,
    deleteItem: actions.delete,
    toggleExclude: actions.toggleExclude,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Item);
}

export default connectItem;
