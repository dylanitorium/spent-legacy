import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_FACTORS, ITEM_TYPES } from 'state/constants';
import { where, by, select } from 'view/utils/arrayUtils';

const reduceAmounts = items => items.reduce((a, { amount, frequency }) => a + (amount * FREQUENCY_FACTORS[frequency]), 0);

const formatMoney = amount => moneyFormatter.format('USD', amount);

const getBudgetById = (budgets, id) => budgets.find(where('id').is(id));

const formatAmountable = amountable => ({
  ...amountable,
});

const groupItems = (items, groups) => groups.map(group => ({
  ...group,
  type: ITEM_TYPES.GROUP,
  items: items.filter(where('groupId').is(group.id)),
}));

const sumGroups = (items, groups) => {
  const ungrouped = items.filter(where('groupId').is(null)).map(item => ({
    ...item,
    amount: formatMoney(item.amount),
  }));

  const grouped = groups.map(group => ({
    ...group,
    amount: formatMoney(reduceAmounts(items.filter(where('groupId').is(group.id)))),
  }));

  return [
    ...grouped,
    ...ungrouped,
  ];
}

// Selectors
// New
export const activeBudgetIdSelector = state => state.app.budgets.activeBudgetId;

// Expenses
export const expensesForGroupSelector = (state, { id: groupId }) => (
  state.data.expenses.records.filter(where('groupId').is(groupId)).sort(by('createdAt'))
);

export const makeExpensesForGroupSelector = () => createSelector(
  [expensesForGroupSelector],
  expenses => expenses,
);

export const makeExpenseIdsForGroupSelector = () => createSelector(
  [expensesForGroupSelector],
  expenses => expenses.map(select('id')),
);

export const expenseSelector = (state, { id: itemId }) => state.data.expenses.records.find(where('id').is(itemId));

export const makeExpenseSelector = () => createSelector(
  [expenseSelector],
  expense => expense,
);


// Incomes
export const incomesForGroupSelector = (state, { id: groupId }) => (
  state.data.incomes.records.filter(where('groupId').is(groupId)).sort(by('createdAt'))
);

export const makeIncomesForGroupSelector = () => createSelector(
  [incomesForGroupSelector],
  incomes => incomes,
);

export const makeIncomeIdsForGroupSelector = () => createSelector(
  [incomesForGroupSelector],
  incomes => incomes.map(select('id')),
);

export const incomeSelector = (state, { id: itemId }) => state.data.incomes.records.find(where('id').is(itemId));

export const makeIncomeSelector = () => createSelector(
  [incomeSelector],
  income => income,
);


// Groups
export const namespacedGroupsSelector = (state, props) => state.data.groups.records.filter(where('namespace').is(props.namespace));

export const makeGroupsSelector = () => createSelector(
  [activeBudgetIdSelector, namespacedGroupsSelector],
  (activeBudgetId, namespacedGroups) => namespacedGroups.filter(where('budgetId').is(activeBudgetId)),
);

// Old
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

export const incomesByBudgetIdSelector = budgetId => createSelector(
  [incomesDataSelector],
  incomes => incomes.filter(where('budgetId').is(budgetId)).sort(by('createdAt'))
);

export const incomesFormattedSelector = budgetId => createSelector(
  [incomesByBudgetIdSelector(budgetId)],
  incomes => incomes.map(formatAmountable),
);

export const incomesTotalByBudgetIdSelector = (budgetId) => createSelector(
  [incomesByBudgetIdSelector(budgetId)],
  reduceAmounts,
);

export const incomesTotalByBudgetIdFormattedSelector = (budgetId) => createSelector(
  [incomesTotalByBudgetIdSelector(budgetId)],
  formatMoney,
);

export const expensesDataSelector = createSelector(
  [dataSelector],
  data => data.expenses.records,
);

export const expensesByBudgetIdSelector = budgetId => createSelector(
  [expensesDataSelector],
  expenses => expenses.filter(where('budgetId').is(budgetId)).sort(by('createdAt'))
);

export const expensesFormattedSelector = budgetId => createSelector(
  [expensesByBudgetIdSelector(budgetId)],
  expenses => expenses.map(formatAmountable),
);

export const expensesTotalByBudgetIdSelector = (budgetId) => createSelector(
  [expensesByBudgetIdSelector(budgetId)],
  reduceAmounts,
);

export const expensesTotalByBudgetIdFormattedSelector = (budgetId) => createSelector(
  [expensesTotalByBudgetIdSelector(budgetId)],
  formatMoney,
);

export const groupsDataSelector = createSelector(
  [dataSelector],
  data => data.groups.records,
);

export const groupsForNamespaceSelector = namespace => createSelector(
  [groupsDataSelector],
  (groups) => groups.filter(where('namespace').is(namespace)),
);

export const groupsByBudgetIdSelector = (namespace) => (budgetId) => createSelector(
  [groupsForNamespaceSelector(namespace)],
  (groups) => groups.filter(where('budgetId').is(budgetId)),
);

export const groupedIncomesSelector = (namespace) => (budgetId) => createSelector(
  [incomesFormattedSelector(budgetId), groupsByBudgetIdSelector(namespace)(budgetId)],
  groupItems,
);

export const groupedExpensesSelector = (namespace) => (budgetId) => createSelector(
  [expensesFormattedSelector(budgetId), groupsByBudgetIdSelector(namespace)(budgetId)],
  groupItems,
);

export const groupedExpensesOverviewSelector = (namespace) => (budgetId) => createSelector(
  [expensesByBudgetIdSelector(budgetId), groupsByBudgetIdSelector(namespace)(budgetId)],
  sumGroups,
);

export const groupedIncomesOverviewSelector = (namespace) => (budgetId) => createSelector(
  [incomesByBudgetIdSelector(budgetId), groupsByBudgetIdSelector(namespace)(budgetId)],
  sumGroups,
);

export const budgetBalanceByBudgetIdSelector = (budgetId) => createSelector(
  incomesTotalByBudgetIdSelector(budgetId),
  expensesTotalByBudgetIdSelector(budgetId),
  (incomes, expenses) => incomes - expenses,
);

export const budgetBalanceByBudgetIdFormattedSelector = (budgetId) => createSelector(
  [budgetBalanceByBudgetIdSelector(budgetId)],
  formatMoney,
);
