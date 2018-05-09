import { expenseEventSelectors } from 'state/selectors';
import { actions as expenseEventActions  } from 'state/modules/expenseEvents';
import ExpenseEvents from 'view/components/pure/ExpenseEvents';
import connectEvents from 'view/utils/connectEvents';

export default connectEvents(expenseEventSelectors, expenseEventActions, ExpenseEvents);
