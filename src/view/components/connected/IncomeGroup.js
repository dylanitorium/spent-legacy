import { connect } from 'react-redux';
import {
  makeIncomeIdsForGroupSelector,
  makeIsGroupExcludedSelector,
} from 'state/selectors';
import Group from 'view/components/pure/ItemTable/Group';
import { actions as groupsActions } from 'state/modules/groups';
import { actions as incomesActions } from 'state/modules/incomes';

const mapStateToProps = () => {
  const incomeIdsForGroupSelector = makeIncomeIdsForGroupSelector();
  const isGroupExcludedSelector = makeIsGroupExcludedSelector();
  return (state, props) => ({
    excluded: isGroupExcludedSelector(state, props),
    items: incomeIdsForGroupSelector(state, props),
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createIncomeWithBudgetId,
  updateGroup: groupsActions.update,
  deleteGroup: groupsActions.delete,
  toggleExclude: groupsActions.toggleExcludeGroup,
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
