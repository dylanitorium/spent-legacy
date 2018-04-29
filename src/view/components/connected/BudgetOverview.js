import { connect } from 'react-redux';
import {
  groupedIncomesOverviewSelector as makeGroupedIncomesOverviewSelector,
  incomesTotalByBudgetIdFormattedSelector,
  expensesTotalByBudgetIdFormattedSelector,
  budgetBalanceByBudgetIdFormattedSelector,
  groupedExpensesOverviewSelector as makeGroupedExpensesOverviewSelector,
  activeBudgetIdSelector
} from 'state/selectors';

import BudgetOverview from 'view/components/pure/BudgetOverview';

const mapStateToProps = () => state => {
  const groupedIncomesOverviewSelector = makeGroupedIncomesOverviewSelector('incomes');
  const groupedExpensesOverviewSelector = makeGroupedExpensesOverviewSelector('expenses');
  return {
    incomes: groupedIncomesOverviewSelector(activeBudgetIdSelector(state))(state),
    incomesTotal: incomesTotalByBudgetIdFormattedSelector(activeBudgetIdSelector(state))(state),
    expenses: groupedExpensesOverviewSelector(activeBudgetIdSelector(state))(state),
    expensesTotal: expensesTotalByBudgetIdFormattedSelector(activeBudgetIdSelector(state))(state),
    budgetBalance: budgetBalanceByBudgetIdFormattedSelector(activeBudgetIdSelector(state))(state),
  }
};

export default connect(mapStateToProps)(BudgetOverview);
