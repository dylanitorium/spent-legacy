import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_FACTORS, ITEM_TYPES } from 'state/constants';
import { where, by, select, combineQueries } from 'view/utils/arrayUtils';

const reduceAmounts = items => items.reduce((a, { amount, frequency }) => a + (amount * FREQUENCY_FACTORS[frequency]), 0);

const formatMoney = amount => moneyFormatter.format('USD', amount);

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
    amount: item.amount,
  }));

  const grouped = groups.map(group => ({
    ...group,
    amount: reduceAmounts(items.filter(where('groupId').is(group.id))),
  }));

  return [
    ...grouped,
    ...ungrouped,
  ];
}

// Selectors
export const selectIdFromProps = (state, { id }) => id;

export const selectNamespaceFromProps = (state, { namespace }) => namespace;

// Budget
export const budgetsSelector = state => state.data.budgets.records;

export const activeBudgetIdSelector = state => state.app.budgets.activeBudgetId;

// Groups
export const groupsSelector = state => state.data.groups.records;

export const excludedGroupsIdSelector = state => state.app.groups.excludedGroups;

export const namespacedGroupsSelector = createSelector(
  [groupsSelector, selectNamespaceFromProps],
  (groups, namespace) => groups.filter(where('namespace').is(namespace)),
);

export const makeGroupsSelector = () => createSelector(
  [activeBudgetIdSelector, namespacedGroupsSelector],
  (activeBudgetId, namespacedGroups) => namespacedGroups.filter(where('budgetId').is(activeBudgetId)),
);

export const isGroupExcludedSelector = createSelector(
  [excludedGroupsIdSelector, selectIdFromProps],
  (excludedGroups, groupId) => excludedGroups.includes(groupId),
);

export const makeIsGroupExcludedSelector = () => createSelector(
  [isGroupExcludedSelector],
  excluded => excluded,
);


// Expenses
export const expensesSelector = state => state.data.expenses.records;

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

export const isExpenseExcludedSelector = (state, { id: itemId }) => state.app.expenses.excludedExpenses.includes(itemId);

export const makeIsExpenseExcludedSelector = () => createSelector(
  [isExpenseExcludedSelector],
  excluded => excluded,
);

export const excludedExpensesIdSelector = state => state.app.expenses.excludedExpenses;

export const makeExpensesOverviewSelector = (format = false) => createSelector(
  [activeBudgetIdSelector, expensesSelector, groupsSelector, excludedGroupsIdSelector, excludedExpensesIdSelector],
  (activeBudgetId, expenses, groups, excludedGroups, excludedExpenses) => {
    const filteredGroups = groups.filter(combineQueries([
      where('namespace').is('expenses'),
      where('budgetId').is(activeBudgetId),
      where('id').isNotIn(excludedGroups),
    ]));

    const filteredExpenses = expenses.filter(where('id').isNotIn(excludedExpenses));

    const sums = sumGroups(filteredExpenses, filteredGroups);
    return format ? sums.map(group => ({ ...group, amount: formatMoney(group.amount) })) : sums;
  }
);

export const makeExpensesTotalSelector = (format = false) => createSelector(
  [activeBudgetIdSelector, expensesSelector, excludedExpensesIdSelector, excludedGroupsIdSelector],
  (activeBudgetId, expenses, excludedExpenses, excludedGroups) => {
    const filteredExpenses = expenses.filter(combineQueries([
      where('budgetId').is(activeBudgetId),
      where('id').isNotIn(excludedExpenses),
      where('groupId').isNotIn(excludedGroups),
    ]));
    const total = reduceAmounts(filteredExpenses);
    return format ? formatMoney(total) : total;
  }
);

export const isGroupExcludedByExpenseIdSelector = createSelector(
  [expensesSelector, excludedGroupsIdSelector, selectIdFromProps],
  (expenses, excludedGroups, itemId) => {
    const { groupId } = expenses.find(where('id').is(itemId));
    return excludedGroups.includes(groupId);
  }
)

export const makeIsGroupExcludedByExpenseIdSelector = () => createSelector(
  [isGroupExcludedByExpenseIdSelector],
  excluded => excluded,
);

// Incomes
export const incomesSelector = state => state.data.incomes.records;

export const incomesForGroupSelector = createSelector(
  [incomesSelector, selectIdFromProps],
  (incomes, groupId) => incomes.filter(where('groupId').is(groupId)).sort(by('createdAt'))
)

export const makeIncomesForGroupSelector = () => createSelector(
  [incomesForGroupSelector],
  incomes => incomes,
);

export const makeIncomeIdsForGroupSelector = () => createSelector(
  [incomesForGroupSelector],
  incomes => incomes.map(select('id')),
);

export const incomeSelector = createSelector(
  [incomesSelector, selectIdFromProps],
  (incomes, itemId) => incomes.find(where('id').is(itemId)),
);

export const makeIncomeSelector = () => createSelector(
  [incomeSelector],
  income => income,
);

export const excludedIncomesIdSelector = state => state.app.incomes.excludedIncomes;

export const makeIncomesOverviewSelector = (format = false) => createSelector(
  [activeBudgetIdSelector, incomesSelector, groupsSelector, excludedGroupsIdSelector, excludedIncomesIdSelector],
  (activeBudgetId, incomes, groups, excludedGroups, excludedIncomes) => {
    const filteredGroups = groups.filter(combineQueries([
      where('namespace').is('incomes'),
      where('budgetId').is(activeBudgetId),
      where('id').isNotIn(excludedGroups),
    ]));

    const filteredIncomes = incomes.filter(where('is').isNotIn(excludedIncomes));

    const sums = sumGroups(filteredIncomes, filteredGroups);
    return format ? sums.map(group => ({ ...group, amount: formatMoney(group.amount) })) : sums;
  }
);

export const makeIncomesTotalSelector = (format = false) => createSelector(
  [activeBudgetIdSelector, incomesSelector, excludedIncomesIdSelector, excludedGroupsIdSelector],
  (activeBudgetId, incomes, excludedIncomes, excludedGroups) => {
    const filteredIncomes = incomes.filter(combineQueries([
      where('budgetId').is(activeBudgetId),
      where('id').isNotIn(excludedIncomes),
      where('groupId').isNotIn(excludedGroups),
    ]));

    const total = reduceAmounts(filteredIncomes);
    return format ? formatMoney(total) : total;
  }
);

// Combined
export const makeBudgetBalanceSelector = (format = false) => createSelector(
  [makeIncomesTotalSelector(), makeExpensesTotalSelector()],
  (income, expenses) => {
    const balance = income - expenses;
    return format ? formatMoney(balance) : balance;
  }
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
  (budgets, id) => budgets.find(where('id').is(id)),
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
