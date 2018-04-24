import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { incomesFormattedSelector, makeGroupsForNamespaceSelector } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';
import { actions as groupsActions } from 'state/modules/groups';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => {
  const groupsForNamespaceSelector = makeGroupsForNamespaceSelector('incomes')
  return (state, props) => ({
    items: incomesFormattedSelector(state),
    frequencyOptions: FREQUENCY_OPTIONS,
    groups: groupsForNamespaceSelector(state)
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createIncomeWithBudgetId,
  deleteItem: incomesActions.delete,
  createGroup: groupsActions.createGroupWithBudgetId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
