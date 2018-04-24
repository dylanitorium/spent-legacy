import { dataActions } from './data';
export { dataReducer } from './data';

export const actions = {
  ...dataActions,
  createGroupWithBudgetId: data => (
    (dispatch, getState) => {
      const {
        app: {
          budgets: {
            activeBudgetId
          }
        }
      } = getState();

      dispatch(dataActions.create({
        ...data,
        budgetId: activeBudgetId,
      }));
    }
  )
};
