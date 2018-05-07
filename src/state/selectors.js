import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import { FREQUENCY_FACTORS } from 'state/constants';
import { where, by, select, combineQueries } from 'view/utils/arrayUtils';

const reduceAmounts = items => items.reduce((a, { amount, frequency }) => a + (amount * FREQUENCY_FACTORS[frequency]), 0);

const formatMoney = amount => moneyFormatter.format('USD', amount);

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

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

// Selectors
export const selectIdFromProps = (state, { id }) => id;

export const selectNamespaceFromProps = (state, { namespace }) => namespace;

// Budget
export const budgetsSelector = state => state.data.budgets.records;

export const activeBudgetIdSelector = state => state.app.budgets.activeBudgetId;

export const hasBudgetsSelector = createSelector(
  [budgetsSelector],
  budgets => budgets.length > 0,
);

export const activeBudgetSelector = createSelector(
  [activeBudgetIdSelector, budgetsSelector],
  (activeBudgetId, budgets) => budgets.find(where('id').is(activeBudgetId)),
)

export const activeBudgetLabelSelector = createSelector(
  [activeBudgetSelector],
  (activeBudget) => activeBudget ? activeBudget.label : '',
);

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

export const itemSelectorFactory = name => {
  const itemsSelector = state => state.data[name].records;

  const itemsForGroupSelector = createSelector(
    [itemsSelector, selectIdFromProps],
    (items, groupId) => items.filter(where('groupId').is(groupId)).sort(by('createdAt'))
  );

  const makeItemIdsForGroupSelector = () => createSelector(
    [itemsForGroupSelector],
    items => items.map(select('id')),
  );

  const itemSelector = createSelector(
    [itemsSelector, selectIdFromProps],
    (items, itemId) => items.find(where('id').is(itemId))
  );

  const makeItemSelector = () => itemSelector;

  const excludedItemsIdSelector = state => state.app[name].excluded;

  const makeItemsOverviewSelector = (format = false) => createSelector(
    [activeBudgetIdSelector, itemsSelector, groupsSelector, excludedGroupsIdSelector, excludedItemsIdSelector],
    (activeBudgetId, items, groups, excludedGroups, excludedItems) => {
      const filteredGroups = groups.filter(combineQueries([
        where('namespace').is(name),
        where('budgetId').is(activeBudgetId),
        where('id').isNotIn(excludedGroups),
      ]));

      const filteredItems = items.filter(where('id').isNotIn(excludedItems));

      const sums = sumGroups(filteredItems, filteredGroups);
      return format ? sums.map(group => ({ ...group, amount: formatMoney(group.amount) })) : sums;
    });

    const makeItemsTotalSelector = (format = false) => createSelector(
      [activeBudgetIdSelector, itemsSelector, excludedItemsIdSelector, excludedGroupsIdSelector],
      (activeBudgetId, items, excludedItems, excludedGroups) => {
        const filteredItems = items.filter(combineQueries([
          where('budgetId').is(activeBudgetId),
          where('id').isNotIn(excludedItems),
          where('groupId').isNotIn(excludedGroups),
        ]));

        const total = reduceAmounts(filteredItems);
        return format ? formatMoney(total) : total;
      }
    );

    const makeGroupedItemsSelector = () => createSelector(
      [activeBudgetIdSelector, groupsSelector, itemsSelector],
      (activeBudgetId, groups, items) => {
        const filteredGroups = groups.filter(combineQueries([
          where('budgetId').is(activeBudgetId),
          where('namespace').is(name),
        ]));

        return filteredGroups.map(group => ({
          ...group,
          items: items.filter(combineQueries([
            where('budgetId').is(activeBudgetId),
            where('groupId').is(group.id),
          ])),
        }));
      }
    );

    const makeIsItemExcludedSelector = () => createSelector(
      [excludedItemsIdSelector, selectIdFromProps],
      (excludedItems, itemId) => excludedItems.includes(itemId)
    );

    const makeIsGroupExcludedByItemIdSelector = () => createSelector(
      [itemSelector, excludedGroupsIdSelector],
      (item, excludedGroups) => excludedGroups.includes(item.groupId),
    );

  return {
    itemsSelector,
    makeItemIdsForGroupSelector,
    itemSelector,
    makeItemSelector,
    makeItemsOverviewSelector,
    makeItemsTotalSelector,
    makeGroupedItemsSelector,
    makeIsItemExcludedSelector,
    makeIsGroupExcludedByItemIdSelector
  };
}

export const incomeSelectors = itemSelectorFactory('incomes');
export const expenseSelectors = itemSelectorFactory('expenses');

// Combined
export const makeBudgetBalanceSelector = (format = false) => createSelector(
  [incomeSelectors.makeItemsTotalSelector(), expenseSelectors.makeItemsTotalSelector()],
  (income, expenses) => {
    const balance = income - expenses;
    return format ? formatMoney(balance) : balance;
  }
);
