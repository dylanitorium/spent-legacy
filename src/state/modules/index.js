import { combineReducers } from 'redux';
import { dataReducer as budgetsData, appReducer as budgetsApp } from 'state/modules/budgets';
import { dataReducer as incomesData, appReducer as incomesApp } from 'state/modules/incomes';
import { dataReducer as categoriesData, appReducer as categoriesApp } from 'state/modules/categories';
import { dataReducer as groupsData, appReducer as groupsApp } from 'state/modules/groups';
import { dataReducer as itemsData, appReducer as itemsApp } from 'state/modules/items';

const data = combineReducers({
  budgets: budgetsData,
  categories: categoriesData,
  groups: groupsData,
  items: itemsData,
  incomes: incomesData,
});

const app = combineReducers({
  budgets: budgetsApp,
  // incomes: incomesApp,
  // categories: categoriesApp,
  // groups: groupsApp,
  // items: itemsApp,
});


const master = combineReducers({
  data,
  app
});


export default master;
