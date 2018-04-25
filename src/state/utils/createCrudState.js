import uuid from 'uuid/v1';
import moment from 'moment';
import { where } from 'view/utils/arrayUtils';

const createCrudState = (name, initialState = {}) => {
  const actionTypes = {
    CREATE: `spent/data/${name}/create`,
    UPDATE: `spent/data/${name}/update`,
    DELETE: `spent/data/${name}/delete`,
  };

  const actions = {
    create: data => {
      const { id: _id, ...attributes } = data;
      const timestamp = moment().format();
      return {
        type: actionTypes.CREATE,
        data: {
          ...attributes,
          id: uuid(),
          createdAt: timestamp,
          lastUpdatedAt: timestamp,
        },
      }
    },
    update: (id, data) => {
      const { id: _id, ...attributes } = data;
      const timestamp = moment().format();
      return {
        type: actionTypes.UPDATE,
        id,
        data: {
          ...attributes,
          timestamp,
        },
      }
    },
    delete: id => ({
      type: actionTypes.DELETE,
      id,
    })
  };

  const itemReducer = (state = initialState, action) => {
    const { type } = action;

    switch(type) {
      case actionTypes.CREATE:
      case actionTypes.UPDATE:
        return {
          ...state,
          ...action.data
        };
      default:
        return state;
    }
  };

  const reducer = (state = { index: 0, records: [] }, action) => {
    const { type } = action;

    switch(type) {
      case actionTypes.CREATE:
        return {
          ...state,
          index: state.index + 1,
          records: [
            ...state.records.filter(where('id').isNot(action.id)),
            itemReducer(state.records.find(where('id').is(action.id)), action),
          ],
        };
      case actionTypes.UPDATE:
        if (Array.isArray(action.id)) {
          return {
            ...state,
            records: [
              ...state.records.filter(where('id').isNotIn(action.id)),
              ...state.records.filter(where('id').isIn(action.id)).map(item => itemReducer(item, action)),
            ],
          };
        } else {
          return {
            ...state,
            records: [
              ...state.records.filter(where('id').isNot(action.id)),
              itemReducer(state.records.find(where('id').is(action.id)), action),
            ],
          };
        }
      case actionTypes.DELETE:
        return {
          ...state,
          records: state.records.filter(where('id').isNot(action.id))
        };
      default:
        return state;
    }
  };

  return {
    actionTypes,
    actions,
    reducer,
  }
};

export default createCrudState;
