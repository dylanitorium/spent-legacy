import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_LABELS, FREQUENCY_FACTORS } from 'state/constants';

// Non-Selector Utils
const getBudgetById = (budgets, id) => budgets.find(({ id: _id }) => id === _id);

const reduceAmounts = items => items.reduce((a, { amount, frequency }) => a + (amount * FREQUENCY_FACTORS[frequency]), 0);

const formatMoney = amount => moneyFormatter.format('USD', amount)

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

export const expensesDataSelector = createSelector(
  [dataSelector],
  data => data.expenses.records,
);

export const expensesFormattedSelector = createSelector(
  [expensesDataSelector],
  expenses => expenses.map(expense => ({
    ...expense,
    amount: moneyFormatter.format('USD', expense.amount),
    frequency: FREQUENCY_LABELS[expense.frequency],
  })),
);

export const incomesTotalSelector = createSelector(
  [incomesDataSelector],
  reduceAmounts,
);

export const incomesTotalFormattedSelector = createSelector(
  [incomesTotalSelector],
  formatMoney,
);

export const expensesTotalSelector = createSelector(
  [expensesDataSelector],
  reduceAmounts,
);

export const expensesTotalFormattedSelector = createSelector(
  [expensesTotalSelector],
  formatMoney,
);

export const budgetBalanceSelector = createSelector(
  incomesTotalSelector,
  expensesTotalSelector,
  (incomes, expenses) => incomes - expenses,
);

export const budgetBalanceFormattedSelector = createSelector(
  [budgetBalanceSelector],
  formatMoney,
);
