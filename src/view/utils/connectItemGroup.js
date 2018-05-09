import { connect } from 'react-redux';
import Group from 'view/components/pure/ItemTable/Group';

const connectItemGroup = (itemSelectors, groupSelectors, itemActions, groupActions) => {
  const mapStateToProps = () => {
    const incomeIdsForGroupSelector = itemSelectors.makeItemIdsForGroupSelector();
    const isGroupExcludedSelector = groupSelectors.makeIsGroupExcludedSelector();
    return (state, props) => ({
      excluded: isGroupExcludedSelector(state, props),
      items: incomeIdsForGroupSelector(state, props),
    });
  }

  const mapDispatchToProps = {
    createItem: itemActions.createWithBudgetId,
    updateGroup: groupActions.update,
    deleteGroup: groupActions.delete,
    toggleExclude: groupActions.toggleExcludeGroup,
  }

  return connect(mapStateToProps, mapDispatchToProps)(Group);
};

export default connectItemGroup;
