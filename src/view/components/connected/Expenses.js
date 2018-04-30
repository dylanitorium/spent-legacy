import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { makeGroupsSelector } from 'state/selectors';
import { actions as expensesActions } from 'state/modules/expenses';
import { actions as groupsActions } from 'state/modules/groups';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => {
  const groupsSelector = makeGroupsSelector();
  return (state, props) => ({
    groups: groupsSelector(state, {...props, namespace: 'expenses' }),
    frequencyOptions: FREQUENCY_OPTIONS,
  });
}

const mapDispatchToProps = {
  createGroup: groupsActions.createGroupWithBudgetId,
  deleteGroup: groupsActions.makeDeleteAndHandleChildren('expenses', expensesActions.delete),
  updateGroup: groupsActions.update,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
