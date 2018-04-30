import { connect } from 'react-redux';
import { makeIncomeSelector } from 'state/selectors';
import Item from 'view/components/pure/ItemTable/Item';
import { actions as incomesActions } from 'state/modules/incomes';

const mapStateToProps = () => {
  const incomeSelector = makeIncomeSelector();
  return (state, props) => ({
    ...incomeSelector(state, props),
  });
}

const mapDispatchToProps = {
  updateItem: incomesActions.update,
  deleteItem: incomesActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
