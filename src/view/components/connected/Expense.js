import { connect } from 'react-redux';
import { makeExpenseSelector } from 'state/selectors';
import Item from 'view/components/pure/ItemTable/Item';
import { actions as expensesActions } from 'state/modules/expenses';

const mapStateToProps = () => {
  const expenseSelector = makeExpenseSelector();
  return (state, props) => ({
    ...expenseSelector(state, props),
  });
}

const mapDispatchToProps = {
  updateItem: expensesActions.update,
  deleteItem: expensesActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
