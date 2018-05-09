import { connect } from 'react-redux';
import {
  incomeSelectors,
  expenseSelectors,
  makeBudgetBalanceSelector,
  budgetOverviewFrequencySelector,
} from 'state/selectors';
import { actions } from 'state/modules/budgets';
import BudgetOverview from 'view/components/pure/BudgetOverview';
import { FREQUENCY_OPTIONS } from 'state/constants';

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
      frequencyOptions: FREQUENCY_OPTIONS,
      activeFrequency: budgetOverviewFrequencySelector(state),
    }
  };
};

const mapDispatchToProps = {
  updateFrequency: actions.setFrequency,
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetOverview);
