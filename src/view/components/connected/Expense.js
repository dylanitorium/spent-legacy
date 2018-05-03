import { connect } from 'react-redux';
import {
  makeExpenseSelector,
  makeIsExpenseExcludedSelector,
  makeIsGroupExcludedByExpenseIdSelector
} from 'state/selectors';
import Item from 'view/components/pure/ItemTable/Item';
import { actions as expensesActions } from 'state/modules/expenses';
import { FREQUENCY_OPTIONS } from 'state/constants';

const mapStateToProps = () => {
  const expenseSelector = makeExpenseSelector();
  const isExpenseExcludedSelector = makeIsExpenseExcludedSelector();
  const isGroupExcludedByExpenseIdSelector =  makeIsGroupExcludedByExpenseIdSelector();
  return (state, props) => {
    return {
      ...expenseSelector(state, props),
      excluded: isExpenseExcludedSelector(state, props),
      groupExcluded: isGroupExcludedByExpenseIdSelector(state, props),
      frequencyOptions: FREQUENCY_OPTIONS,
    }
  }
}

const mapDispatchToProps = {
  toggleExclude: expensesActions.toggleExcludeExpense,
  updateItem: expensesActions.update,
  deleteItem: expensesActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
