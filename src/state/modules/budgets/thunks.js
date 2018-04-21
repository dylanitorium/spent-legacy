import { actions, CONSTANTS } from './index';

export const createBudgetWithDefault = (budgetName) => (
  (dispatch) => {
    const label = budgetName.length > 0 ? budgetName : CONSTANTS.DEFAULT_BUDGET_NAME;
    dispatch(actions.create({ label }));
  }
);
