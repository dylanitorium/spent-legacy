import { connect } from 'react-redux';
import {
  incomesDataSelector,
  incomesTotalFormattedSelector,
  expensesDataSelector,
  expensesTotalFormattedSelector,
  budgetBalanceFormattedSelector,
} from 'state/selectors';

import BudgetOverview from 'view/components/pure/BudgetOverview';

const mapStateToProps = () => state => ({
  incomes: incomesDataSelector(state),
  incomesTotal: incomesTotalFormattedSelector(state),
  expenses: expensesDataSelector(state),
  expensesTotal: expensesTotalFormattedSelector(state),
  budgetBalance: budgetBalanceFormattedSelector(state),
});

export default connect(mapStateToProps)(BudgetOverview);
