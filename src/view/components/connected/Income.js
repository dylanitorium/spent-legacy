import { connect } from 'react-redux';
import {
  makeIncomeSelector,
  makeIsExpenseExcludedSelector,
  makeIsGroupExcludedByExpenseIdSelector,
} from 'state/selectors';
import Item from 'view/components/pure/ItemTable/Item';
import { actions as incomesActions } from 'state/modules/incomes';
import { FREQUENCY_OPTIONS } from 'state/constants';

const mapStateToProps = () => {
  const incomeSelector = makeIncomeSelector();
  const isIncomeExcludedSelector = makeIsExpenseExcludedSelector();
  const isGroupExcludedByIncomeIdSelector = makeIsGroupExcludedByExpenseIdSelector();
  return (state, props) => ({
    ...incomeSelector(state, props),
    excluded: isIncomeExcludedSelector(state, props),
    groupExcluded: isGroupExcludedByIncomeIdSelector(state, props),
    frequencyOptions: FREQUENCY_OPTIONS,
  });
}

const mapDispatchToProps = {
  updateItem: incomesActions.update,
  deleteItem: incomesActions.delete,
  toggleExclude: incomesActions.toggleExcludeIncome,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
