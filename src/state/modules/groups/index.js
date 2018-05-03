import { where, call } from 'view/utils/arrayUtils';
import { dataActions } from './data';
import { appActions } from './app';
export { dataReducer } from './data';
export { appReducer } from './app';


export const actions = {
  ...dataActions,
  ...appActions,
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
  ),
  makeDeleteAndHandleChildren: (childName, childDeleteAction) => (groupId) => (
    (dispatch, getState) => {
      dispatch(dataActions.delete(groupId));

      const {
        data: {
          [childName]: {
            records,
          },
        },
      } = getState();

      const dispatchChildDeleteAction = id => dispatch(childDeleteAction(id));

      records
        .filter(where('groupId').is(groupId))
        .forEach(call(dispatchChildDeleteAction).with('id'));
    }
  ),
};
