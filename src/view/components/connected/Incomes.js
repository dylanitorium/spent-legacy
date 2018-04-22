import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { incomesDataSelector } from 'state/selectors';
import { actions as incomesActions } from 'state/modules/incomes';

import Incomes from 'view/components/pure/Incomes';

const mapStateToProps = () => state => ({
  incomes: incomesDataSelector(state),
  frequencyOptions: FREQUENCY_OPTIONS,
});

const mapDispatchToProps = {
  createIncome: incomesActions.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
