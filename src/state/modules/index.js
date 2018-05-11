import { combineReducers } from 'redux';
import { dataReducer as budgetsData, appReducer as budgetsApp } from 'state/modules/budgets';
import { dataReducer as incomesData, appReducer as incomesApp } from 'state/modules/incomes';
import { dataReducer as groupsData, appReducer as groupsApp } from 'state/modules/groups';
import { dataReducer as expensesData, appReducer as expensesApp } from 'state/modules/expenses';
import { dataReducer as incomeEventsData, appReducer as incomeEventsApp } from 'state/modules/incomeEvents';
import { dataReducer as expenseEventsData, appReducer as expenseEventsApp } from 'state/modules/expenseEvents';
import { reducer as trackingApp } from 'state/modules/tracking';

const data = combineReducers({
  budgets: budgetsData,
  groups: groupsData,
  expenses: expensesData,
  incomes: incomesData,
  incomeEvents: incomeEventsData,
  expenseEvents: expenseEventsData,
});

const app = combineReducers({
  budgets: budgetsApp,
  incomes: incomesApp,
  groups: groupsApp,
  expenses: expensesApp,
  incomeEvents: incomeEventsApp,
  expenseEvents: expenseEventsApp,
  tracking: trackingApp,
});


const master = combineReducers({
  data,
  app
});


export default master;
