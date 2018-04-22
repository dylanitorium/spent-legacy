import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { incomesFormattedSelector } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => state => ({
  incomes: incomesFormattedSelector(state),
  frequencyOptions: FREQUENCY_OPTIONS,
});

const mapDispatchToProps = {
  createIncome: incomesActions.createIncomeWithBudgetId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
