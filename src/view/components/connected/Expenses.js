import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { makeExpensesFormattedSelector, makeGroupsForNamespaceSelector, activeBudgetIdSelector } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';
import { actions as groupsActions } from 'state/modules/groups';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => {
  const groupsForNamespaceSelector = makeGroupsForNamespaceSelector('expenses')
  return state => ({
    items: makeExpensesFormattedSelector(activeBudgetIdSelector(state))(state),
    itemsCount: makeExpensesFormattedSelector(activeBudgetIdSelector(state))(state).count,
    frequencyOptions: FREQUENCY_OPTIONS,
    groups: groupsForNamespaceSelector(state)
  });
}

const mapDispatchToProps = {
  createItem: expensesActions.createExpenseWithBudgetId,
  deleteItem: expensesActions.delete,
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.delete,
  addItemsToGroup: expensesActions.update
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
