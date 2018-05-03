import { connect } from 'react-redux';
import {
  makeIncomesOverviewSelector,
  makeIncomesTotalSelector,
  makeExpensesOverviewSelector,
  makeExpensesTotalSelector,
  makeBudgetBalanceSelector,
} from 'state/selectors';

import BudgetOverview from 'view/components/pure/BudgetOverview';

const mapStateToProps = () => {
  const incomesOverviewSelector = makeIncomesOverviewSelector(true);
  const incomesTotalSelector = makeIncomesTotalSelector(true);
  const expensesOverviewSelector = makeExpensesOverviewSelector(true);
  const expensesTotalSelector = makeExpensesTotalSelector(true);
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
