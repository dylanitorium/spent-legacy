import { connect } from 'react-redux';
import {
  incomeSelectors,
  makeIsGroupExcludedSelector,
} from 'state/selectors';
import Group from 'view/components/pure/ItemTable/Group';
import { actions as groupsActions } from 'state/modules/groups';
import { actions as incomesActions } from 'state/modules/incomes';

const mapStateToProps = () => {
  const incomeIdsForGroupSelector = incomeSelectors.makeItemIdsForGroupSelector();
  const isGroupExcludedSelector = makeIsGroupExcludedSelector();
  return (state, props) => ({
    excluded: isGroupExcludedSelector(state, props),
    items: incomeIdsForGroupSelector(state, props),
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createWithBudgetId,
  updateGroup: groupsActions.update,
  deleteGroup: groupsActions.delete,
  toggleExclude: groupsActions.toggleExcludeGroup,
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
