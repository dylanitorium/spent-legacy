import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_LABELS } from 'state/constants';

// Non-Selector Utils
const getBudgetById = (budgets, id) => budgets.find(({ id: _id }) => id === _id);

// Selectors
export const dataSelector = state => state.data;


export const appSelector = state => state.app;

export const budgetsDataSelector = createSelector(
  [dataSelector],
  data => data.budgets.records,
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
  data => data.incomes.records,
);

export const incomesFormattedSelector = createSelector(
  [incomesDataSelector],
  incomes => incomes.map(income => ({
    ...income,
    amount: moneyFormatter.format('USD', income.amount),
    frequency: FREQUENCY_LABELS[income.frequency],
  })),
);

export const itemsDataSelector = createSelector(
  [dataSelector],
  data => data.items.records,
);

export const itemsFormattedSelector = createSelector(
  [itemsDataSelector],
  items => items.map(item => ({
    ...item,
    amount: moneyFormatter.format('USD', item.amount),
    frequency: FREQUENCY_LABELS[item.frequency],
  })),
);
