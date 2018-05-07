import { connect } from 'react-redux';
import { expenseSelectors, makeIsGroupExcludedSelector } from 'state/selectors';
import Group from 'view/components/pure/ItemTable/Group';
import { actions as groupsActions } from 'state/modules/groups';
import { actions as expensesActions } from 'state/modules/expenses';

const mapStateToProps = () => {
  const expensesIdsForGroupSelector = expenseSelectors.makeItemIdsForGroupSelector();
  const isGroupExcludedSelector =  makeIsGroupExcludedSelector();
  return (state, props) => ({
    excluded: isGroupExcludedSelector(state, props),
    items: expensesIdsForGroupSelector(state, props),
  });
}

const mapDispatchToProps = {
  toggleExclude: groupsActions.toggleExcludeGroup,
  createItem: expensesActions.createWithBudgetId,
  updateGroup: groupsActions.update,
  deleteGroup: groupsActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
