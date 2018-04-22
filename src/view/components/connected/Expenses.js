import { connect } from 'react-redux';
import { FREQUENCY_OPTIONS } from 'state/constants';
import { itemsFormattedSelector } from 'state/selectors';
import { actions as itemsActions } from 'state/modules/items';

import Expenses from 'view/components/pure/Expenses';

const mapStateToProps = () => state => ({
  items: itemsFormattedSelector(state),
  frequencyOptions: FREQUENCY_OPTIONS,
});

const mapDispatchToProps = {
  createItem: itemsActions.createItemWithBudgetId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
