import { connect } from 'react-redux';
import {
  incomeSelectors,
  expenseSelectors,
  makeBudgetBalanceSelector,
} from 'state/selectors';

import BudgetOverview from 'view/components/pure/BudgetOverview';

const mapStateToProps = () => {
  const incomesOverviewSelector = incomeSelectors.makeItemsOverviewSelector(true);
  const incomesTotalSelector = incomeSelectors.makeItemsTotalSelector(true);
  const expensesOverviewSelector = expenseSelectors.makeItemsOverviewSelector(true);
  const expensesTotalSelector = expenseSelectors.makeItemsTotalSelector(true);
  const budgetBalanceSelector = makeBudgetBalanceSelector(true);

  return (state, props) => {
    return {
      incomes: incomesOverviewSelector(state),
      incomesTotal: incomesTotalSelector(state),
      expenses: expensesOverviewSelector(state),
      expensesTotal: expensesTotalSelector(state),
      budgetBalance: budgetBalanceSelector(state),
    }
  };
}


export default connect(mapStateToProps)(BudgetOverview);
