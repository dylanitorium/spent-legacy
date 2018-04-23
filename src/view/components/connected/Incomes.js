import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { incomesFormattedSelector } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => state => ({
  items: incomesFormattedSelector(state),
  frequencyOptions: FREQUENCY_OPTIONS,
});

const mapDispatchToProps = {
  createItem: incomesActions.createIncomeWithBudgetId,
  deleteItem: incomesActions.delete,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
