import createCrudState from 'state/utils/createCrudState';

export const CONSTANTS = {
  DEFAULT_BUDGET_NAME: 'My Budget'
};

// data
const initialDataState = { label: '' };
export const { actions: dataActions, reducer: dataReducer } = createCrudState('budgets', initialDataState);

// app
const appActionTypes = {
  SET_ACTIVE_BUDGET: 'spent/app/budgets/set',
}

const appActions = {
  setActiveBudget: (budgetId) => ({
    type: appActionTypes.SET_ACTIVE_BUDGET,
    budgetId,
  }),
};

const initialAppState = {
  activeBudgetId: 0,
};

export const appReducer = (state = initialAppState, action) => {
  const { type } = action;

  switch (type) {
    case appActionTypes.SET_ACTIVE_BUDGET:
      return {
        ...state,
        activeBudgetId: action.budgetId,
      }
    default:
      return state;
  }
}
// middleware
const thunkActions = {
  createBudgetWithDefault: (budgetName) => (
    (dispatch) => {
      const label = budgetName.length > 0 ? budgetName : CONSTANTS.DEFAULT_BUDGET_NAME;
      const createAction = actions.create({ label });
      dispatch(createAction);
      dispatch(appActions.setActiveBudget(createAction.data.id))
    }
  ),
}

export const actions = {
  ...dataActions,
  ...appActions,
  ...thunkActions,
};;
