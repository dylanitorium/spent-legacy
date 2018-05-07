import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { incomeSelectors } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';
import { actions as groupsActions } from 'state/modules/groups';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => {
  const groupeditemsSelector = incomeSelectors.makeGroupedItemsSelector();
  return (state, props) => ({
    groups: groupeditemsSelector(state, { ...props, namespace: 'incomes' }),
    frequencyOptions: FREQUENCY_OPTIONS,
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createWithBudgetId,
  updateItem: incomesActions.update,
  deleteItem: incomesActions.delete,
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.makeDeleteAndHandleChildren('incomes', incomesActions.delete),
  updateGroup: groupsActions.update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
