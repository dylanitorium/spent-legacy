import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import {
  groupedExpensesSelector as makeGroupedExpensesSelector,
  activeBudgetIdSelector } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';
import { actions as groupsActions } from 'state/modules/groups';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => {
  const groupedExpensesSelector = makeGroupedExpensesSelector('expenses');
  return state => ({
    groups: groupedExpensesSelector(activeBudgetIdSelector(state))(state),
    frequencyOptions: FREQUENCY_OPTIONS,
  });
}

const mapDispatchToProps = {
  createItem: expensesActions.createExpenseWithBudgetId,
  updateItem: expensesActions.update,
  deleteItem: expensesActions.delete,
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.makeDeleteAndHandleChildren('expenses', expensesActions.delete),
  updateGroup: groupsActions.update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
