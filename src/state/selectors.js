import { createSelector } from 'reselect';

// Non-Selector Utils
const getBudgetById = (budgets, id) => budgets.find(({ id: _id }) => id === _id);

// Selectors
export const budgetsSelector = state => state.budgets;

export const defaultBudgetIdSelector = state => state.application.budgets.defaultBudgetId;

export const defaultBudgetSelector = createSelector(
  [budgetsSelector, defaultBudgetIdSelector],
  getBudgetById,
);

export const hasBudgetsSelector = createSelector(
  [budgetsSelector],
  budgets => budgets.length > 0,
);

export const makeBudgetByIdSelector = id => createSelector(
  budgetsSelector,
  budgets => getBudgetById(budgets, id),
);
