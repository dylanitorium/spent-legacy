import { createSelector } from 'reselect';

// Non-Selector Utils
const getBudgetById = (budgets, id) => budgets.find(({ id: _id }) => id === _id);

// Selectors
export const dataSelector = state => state.data;

export const appSelector = state => state.app;

export const budgetsDataSelector = createSelector(
  [dataSelector],
  data => data.budgets,
);

export const budgetsAppSelector = createSelector(
  [appSelector],
  state => state.budgets,
);

export const activeBudgetIdSelector = createSelector(
  [budgetsAppSelector],
  budgets => budgets.activeBudgetId
);

export const activeBudgetSelector = createSelector(
  [budgetsDataSelector, activeBudgetIdSelector],
  getBudgetById,
);

export const activeBudgetLabelSelector = createSelector(
  [activeBudgetSelector],
  budget => (budget ? budget.label : undefined),
);

export const hasBudgetsSelector = createSelector(
  [budgetsDataSelector],
  budgets => budgets.length > 0,
);

export const makeBudgetByIdSelector = id => createSelector(
  budgetsDataSelector,
  budgets => getBudgetById(budgets, id),
);

export const incomesDataSelector = createSelector(
  [dataSelector],
  data => data.incomes,
)
