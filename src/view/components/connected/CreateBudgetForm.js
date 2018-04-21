import { connect } from 'react-redux';
import { actions as budgetActions, CONSTANTS } from 'state/modules/budgets';

import CreateBudgetForm from 'view/components/pure/CreateBudgetForm';

const mapStateToProps = () => () => ({
  defaultBudgetName: CONSTANTS.DEFAULT_BUDGET_NAME,
});

const mapDispatchToProps = { createBudget: budgetActions.createBudgetWithDefault };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudgetForm);
