import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { expensesFormattedSelector } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => state => ({
  items: expensesFormattedSelector(state),
  frequencyOptions: FREQUENCY_OPTIONS,
});

const mapDispatchToProps = {
  createItem: expensesActions.createExpenseWithBudgetId,
  deleteItem: expensesActions.delete,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
