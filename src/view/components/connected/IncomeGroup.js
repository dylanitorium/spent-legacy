import { connect } from 'react-redux';
import { makeIncomeIdsForGroupSelector } from 'state/selectors';
import Group from 'view/components/pure/ItemTable/Group';
import { actions as groupsActions } from 'state/modules/groups';
import { actions as incomesActions } from 'state/modules/incomes';

const mapStateToProps = () => {
  const incomeIdsForGroupSelector = makeIncomeIdsForGroupSelector();
  return (state, props) => ({
    items: incomeIdsForGroupSelector(state, props),
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createIncomeWithBudgetId,
  updateGroup: groupsActions.update,
  deleteGroup: groupsActions.delete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
