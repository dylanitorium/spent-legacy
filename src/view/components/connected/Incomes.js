import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import {
  groupedIncomesSelector as makeGroupedIncomesSelector,
  activeBudgetIdSelector } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';
import { actions as groupsActions } from 'state/modules/groups';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => {
  const groupedIncomesSelector = makeGroupedIncomesSelector('incomes');
  return state => ({
    groups: groupedIncomesSelector(activeBudgetIdSelector(state))(state),
    frequencyOptions: FREQUENCY_OPTIONS,
  });
}

const mapDispatchToProps = {
  createItem: incomesActions.createIncomeWithBudgetId,
  updateItem: incomesActions.update,
  deleteItem: incomesActions.delete,
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.makeDeleteAndHandleChildren('incomes', incomesActions.delete),
  updateGroup: groupsActions.update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
