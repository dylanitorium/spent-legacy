import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_LABELS, FREQUENCY_FACTORS } from 'state/constants';
import { where } from 'view/utils/arrayUtils';

const reduceAmounts = items => items.reduce((a, { amount, frequency }) => a + (amount * FREQUENCY_FACTORS[frequency]), 0);

const formatMoney = amount => moneyFormatter.format('USD', amount);

const getBudgetById = (budgets, id) => budgets.find(where('id').is(id));

const formatAmountable = amountable => ({
  ...amountable,
  amount: moneyFormatter.format('USD', amountable.amount),
  frequency: FREQUENCY_LABELS[amountable.frequency],
});

const asDropdownItem = group => ({
  text: group.label,
  value: group.id,
  key: group.id,
});

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

export const incomesDataSelector = createSelector(
  [dataSelector],
  data => data.incomes.records,
);

export const incomesFormattedSelector = createSelector(
  [incomesDataSelector],
  incomes => incomes.map(formatAmountable),
);

export const makeIncomesByBudgetIdSelector = budgetId => createSelector(
  [incomesDataSelector],
  incomes => incomes.filter(where('budgetId').is(budgetId))
);

export const makeIncomesFormattedSelector = budgetId => createSelector(
  [makeIncomesByBudgetIdSelector(budgetId)],
  incomes => incomes.map(formatAmountable),
);

export const expensesDataSelector = createSelector(
  [dataSelector],
  data => data.expenses.records,
);

export const expensesFormattedSelector = budgetId => createSelector(
  [expensesDataSelector],
  expenses => expenses.map(formatAmountable),
);

export const makeExpensesByBudgetIdSelector = budgetId => createSelector(
  [expensesDataSelector],
  expenses => expenses.filter(where('budgetId').is(budgetId))
);

export const makeExpensesFormattedSelector = budgetId => createSelector(
  [makeExpensesByBudgetIdSelector(budgetId)],
  expenses => expenses.map(formatAmountable),
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

export const groupsDataSelector = createSelector(
  [dataSelector],
  data => data.groups.records,
);

export const groupsFormattedSelector = createSelector(
  [groupsDataSelector],
  groups => groups.map(group => ({
    text: group.label,
    value: group.id,
    key: group.id,
  }))
);

export const makeGroupsForNamespaceSelector = namespace => createSelector(
  [groupsDataSelector],
  (groups) => groups.filter(where('namespace').is(namespace)),
);
