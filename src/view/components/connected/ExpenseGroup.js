import { connect } from 'react-redux';
import { makeExpenseIdsForGroupSelector, makeIsGroupExcludedSelector } from 'state/selectors';
import Group from 'view/components/pure/ItemTable/Group';
import { actions as groupsActions } from 'state/modules/groups';
import { actions as expensesActions } from 'state/modules/expenses';

const mapStateToProps = () => {
  const expenseIdsForGroupSelector = makeExpenseIdsForGroupSelector();
  const isGroupExcludedSelector =  makeIsGroupExcludedSelector();
  return (state, props) => ({
    excluded: isGroupExcludedSelector(state, props),
    items: expenseIdsForGroupSelector(state, props),
  });
}

const mapDispatchToProps = {
  toggleExclude: groupsActions.toggleExcludeGroup,
  createItem: expensesActions.createExpenseWithBudgetId,
  updateGroup: groupsActions.update,
  deleteGroup: groupsActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
