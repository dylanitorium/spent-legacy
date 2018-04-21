import { combineReducers } from 'redux';
import { reducer as budgets } from 'state/modules/budgets';
import { reducer as categories } from 'state/modules/categories';
import { reducer as groups } from 'state/modules/groups';
import { reducer as items } from 'state/modules/items';

const reducer = combineReducers({
  budgets,
  categories,
  groups,
  items,
});

export default reducer;
