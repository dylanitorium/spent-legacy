import { connect } from 'react-redux';
import { expenseSelectors } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';
import { actions as groupsActions } from 'state/modules/groups';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => {
  const groupeditemsSelector = expenseSelectors.makeGroupedItemsSelector();
  return (state, props) => ({
    groups: groupeditemsSelector(state, {...props, namespace: 'expenses' }),
  });
}

const mapDispatchToProps = {
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.makeDeleteAndHandleChildren('expenses', expensesActions.delete),
  updateGroup: groupsActions.update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
