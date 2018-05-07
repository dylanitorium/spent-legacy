import { connect } from 'react-redux';
import {
  incomeSelectors,
} from 'state/selectors';
import Item from 'view/components/pure/ItemTable/Item';
import { actions as incomesActions } from 'state/modules/incomes';
import { FREQUENCY_OPTIONS } from 'state/constants';

const mapStateToProps = () => {
  const itemSelector = incomeSelectors.makeItemSelector();
  const isIncomeExcludedSelector = incomeSelectors.makeIsItemExcludedSelector();
  const isGroupExcludedByIncomeIdSelector = incomeSelectors.makeIsGroupExcludedByItemIdSelector();
  return (state, props) => ({
    ...itemSelector(state, props),
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
