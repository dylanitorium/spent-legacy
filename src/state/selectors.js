import { createSelector } from 'reselect';
import moneyFormatter from 'money-formatter';
import moment from 'moment';
import { FREQUENCY_FACTORS, FREQUENCY_MAP } from 'state/constants';
import { where, by, select, call, combineQueries, sum, is, combine, through, pluck } from 'view/utils/arrayUtils';

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
};

const dateAsUnixMilli = date => moment(date, 'YYYY-MM-DD').valueOf();

const standardiseAmount = (amount, frequency) => (amount * FREQUENCY_FACTORS[frequency]);
const adjustToFrequency = frequency => amount => amount / FREQUENCY_FACTORS[frequency];

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

export const budgetOverviewFrequencySelector = state => state.app.budgets.overviewFrequency;

export const trackingPeriodSelector = state => state.app.tracking.trackingPeriod;

// Groups
export const groupSelectors = (() => {
  const groupsSelector = state => state.data.groups.records;

  const excludedGroupsIdSelector = state => state.app.groups.excludedGroups;

  const namespacedGroupsSelector = createSelector(
    [groupsSelector, selectNamespaceFromProps],
    (groups, namespace) => groups.filter(where('namespace').is(namespace)),
  );

  const makeGroupsSelector = () => createSelector(
    [activeBudgetIdSelector, namespacedGroupsSelector],
    (activeBudgetId, namespacedGroups) => namespacedGroups.filter(where('budgetId').is(activeBudgetId)),
  );

  const isGroupExcludedSelector = createSelector(
    [excludedGroupsIdSelector, selectIdFromProps],
    (excludedGroups, groupId) => excludedGroups.includes(groupId),
  );

  const makeIsGroupExcludedSelector = () => createSelector(
    [isGroupExcludedSelector],
    excluded => excluded,
  );

  return {
    groupsSelector,
    excludedGroupsIdSelector,
    namespacedGroupsSelector,
    makeGroupsSelector,
    isGroupExcludedSelector,
    makeIsGroupExcludedSelector,
  }
})();

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

  const makeItemsOverviewSelector = () => createSelector(
    [
      activeBudgetIdSelector,
      itemsSelector,
      groupSelectors.groupsSelector,
      groupSelectors.excludedGroupsIdSelector,
      excludedItemsIdSelector,
      budgetOverviewFrequencySelector,
    ],
    (activeBudgetId, items, groups, excludedGroups, excludedItems) => {
      const filteredGroups = groups.filter(combineQueries([
        where('namespace').is(name),
        where('budgetId').is(activeBudgetId),
        where('id').isNotIn(excludedGroups),
      ]));

      const filteredItems = items.filter(where('id').isNotIn(excludedItems));

      return sumGroups(filteredItems, filteredGroups);
    }
  );

  const makeItemsBudgetOverviewSelector = (format = false) => createSelector(
    [makeItemsOverviewSelector(), budgetOverviewFrequencySelector],
    (overviews, frequency) => {
      const sums = overviews.map(call(adjustToFrequency(frequency)).on('amount'));
      return format ? sums.map(call(formatMoney).on('amount')) : sums;
    }
  );

  const makeItemsTrackingOverviewSelector = (format = false) => createSelector(
    [makeItemsOverviewSelector(), trackingPeriodSelector],
    (overviews, period) => {
      const sums = overviews.map(call(adjustToFrequency(period)).on('amount'));
      return format ? sums.map(call(formatMoney).on('amount')) : sums;
    }
  );

  const makeItemsTotalSelector = () => createSelector(
    [
      activeBudgetIdSelector,
      itemsSelector,
      excludedItemsIdSelector,
      groupSelectors.excludedGroupsIdSelector,
    ],
    (activeBudgetId, items, excludedItems, excludedGroups) => {
      const filteredItems = items.filter(combineQueries([
        where('budgetId').is(activeBudgetId),
        where('id').isNotIn(excludedItems),
        where('groupId').isNotIn(excludedGroups),
      ]));

      return reduceAmounts(filteredItems);
    }
  );

  const makeItemsBudgetTotalSelector = (format = false) => createSelector(
    [makeItemsTotalSelector(), budgetOverviewFrequencySelector],
    (total, frequency) => {
      const adjustedTotal = adjustToFrequency(frequency)(total);
      return format ? formatMoney(adjustedTotal) : total
    }
  );

  const makeItemsTrackingTotalSelector = (format = false) => createSelector(
    [makeItemsTotalSelector(), trackingPeriodSelector],
    (total, period) => {
      const adjustedTotal = adjustToFrequency(period)(total);
      return format ? formatMoney(adjustedTotal) : total
    }
  );

  const makeGroupedItemsSelector = () => createSelector(
    [activeBudgetIdSelector, groupSelectors.groupsSelector, itemsSelector],
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
    [itemSelector, groupSelectors.excludedGroupsIdSelector],
    (item, excludedGroups) => excludedGroups.includes(item.groupId),
  );

  const itemMapSelector = createSelector(
    [itemsSelector],
    items => items.map(({ id: value, label: text  }) => ({ text, value })),
  );

  return {
    itemsSelector,
    itemSelector,
    excludedItemsIdSelector,
    makeItemSelector,
    makeItemIdsForGroupSelector,
    makeItemsOverviewSelector,
    makeItemsBudgetOverviewSelector,
    makeItemsTrackingOverviewSelector,
    makeItemsTotalSelector,
    makeItemsBudgetTotalSelector,
    makeItemsTrackingTotalSelector,
    makeGroupedItemsSelector,
    makeIsItemExcludedSelector,
    makeIsGroupExcludedByItemIdSelector,
    itemMapSelector
  };
}

export const incomeSelectors = itemSelectorFactory('incomes');
export const expenseSelectors = itemSelectorFactory('expenses');

const itemEventSelectorFactory = (name) => {
  const itemEventsSelector = state => state.data[name].records;

  const reconciledItemsEventsSelector = createSelector(
    [activeBudgetIdSelector, itemEventsSelector],
    (activeBudgetId, items) => items.filter(combineQueries([
      where('budgetId').is(activeBudgetId),
      where('reconciled').is(true),
    ]))
  );

  const unreconciledItemsEventsSelector = createSelector(
    [activeBudgetIdSelector, itemEventsSelector],
    (activeBudgetId, items) => items.filter(combineQueries([
      where('budgetId').is(activeBudgetId),
      where('reconciled').isNot(true),
    ]))
  );

  const itemEventSelector = createSelector(
    [itemEventsSelector, selectIdFromProps],
    (items, itemId) => items.find(where('id').is(itemId))
  );

  const makeItemEventSelector = () => itemEventSelector;

  return {
    itemEventsSelector,
    itemEventSelector,
    makeItemEventSelector,
    reconciledItemsEventsSelector,
    unreconciledItemsEventsSelector,
  };
};

export const incomeEventSelectors = itemEventSelectorFactory('incomeEvents');
export const expenseEventSelectors = itemEventSelectorFactory('expenseEvents');


const makeTrackingSelectors = (itemName, eventName, factor) => {
  const itemSelectors = itemSelectorFactory(itemName);
  const itemEventSelectors = itemEventSelectorFactory(eventName);

  const makeItemTracksSelector = () => createSelector(
    [
      trackingPeriodSelector,
      itemSelectors.makeGroupedItemsSelector(),
      itemSelectors.excludedItemsIdSelector,
      groupSelectors.excludedGroupsIdSelector,
      itemEventSelectors.reconciledItemsEventsSelector,
    ],
    (period, groups, excludedItems, excludedGroups, reconciledEvents) => {
      const subtractArgs = period === FREQUENCY_MAP.FORTNIGHT ? [2, 'weeks'] : [1, period];
      const filteredEvents = reconciledEvents.filter(
        where('date')
          .passedThrough(dateAsUnixMilli)
          .isGreaterThan(moment().subtract(...subtractArgs))
      );



      const formatItem = (item) => {
        const eventsForItem = filteredEvents.filter(where('itemId').is(item.id));
        const actual = eventsForItem.reduce(sum('amount'), 0);
        const expected = adjustToFrequency(period)(standardiseAmount(item.amount, item.frequency));
        const variance = actual - expected * factor;
        return {
          ...item,
          expected: formatMoney(expected),
          actual: formatMoney(actual),
          variance: formatMoney(variance),
          positive: is(variance).positive,
        };
      };

      const calculateIncludedEvents = items => items.filter(where('id').isNotIn(excludedItems)).map(formatItem);

      const unallocatedGroups = groups.filter(where('id').isIn(excludedGroups));
      const unallocatedItems = [
        ...groups.reduce(combine('items'), []).filter(where('id').isIn(excludedItems)),
        ...unallocatedGroups.reduce(combine('items'), []),
      ];

      const uniqueUnallocatedItems = unallocatedItems.filter(where('id').isUnique);

      const formatAsUnallocated = item => ({
        ...item,
        label: `(${item.label})`,
        amount: 0,
      });

      const unallocated = {
        label: 'Unallocated',
        items: uniqueUnallocatedItems.map(through([formatAsUnallocated, formatItem])),
      };

      const includedGroups = groups
        .filter(where('id').isNotIn(excludedGroups))
        .map(call(calculateIncludedEvents).on('items'));

      return [
        ...includedGroups,
        unallocated,
      ];
    }
  );

  return {
    makeItemTracksSelector
  };
};

export const incomeTrackingSelectors = makeTrackingSelectors('incomes', 'incomeEvents', 1);
export const expenseTrackingSelectors = makeTrackingSelectors('expenses', 'expenseEvents', -1);


// Combined
export const makeBudgetBalanceSelector = (format = false) => createSelector(
  [
    incomeSelectors.makeItemsTotalSelector(),
    expenseSelectors.makeItemsTotalSelector(),
    budgetOverviewFrequencySelector,
  ],
  (income, expenses, frequency) => {
    const balance = adjustToFrequency(frequency)(income - expenses);
    return format ? formatMoney(balance) : balance;
  }
);
