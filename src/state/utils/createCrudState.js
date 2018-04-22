import uuid from 'uuid/v1';
import moment from 'moment';

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

  const reducer = (state = [], action) => {
    const { type } = action;

    switch(type) {
      case actionTypes.CREATE:
      case actionTypes.UPDATE:
        return [
          ...state.filter(({ id }) => id !== action.id),
          itemReducer(state.find(({ id }) => id === action.id), action),
        ];
      case actionTypes.DELETE:
        return state.filter(({ id }) => id !== action.id);
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
