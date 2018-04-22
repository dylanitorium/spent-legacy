import { dataActions } from './data';
import { appActions } from './app';
export { dataReducer } from './data';
export { appReducer } from './app';

export const CONSTANTS = {
  DEFAULT_BUDGET_NAME: 'My Budget'
};

export const actions = {
  ...dataActions,
  ...appActions,
  createBudgetWithDefault: (budgetName) => (
    (dispatch) => {
      const label = budgetName.length > 0 ? budgetName : CONSTANTS.DEFAULT_BUDGET_NAME;
      const createAction = actions.create({ label });
      dispatch(createAction);
      dispatch(appActions.setActiveBudget(createAction.data.id))
    }
  ),
};;
