import { dataActions } from './data';
import { appActions } from './app';
export { dataReducer } from './data';
export { appReducer } from './app';

export const actions = {
  ...dataActions,
  ...appActions,
  createSchema: (data) => (
    (dispatch) => {
      const { label, row, dateFormat, ...schema } = data;

      const createAction = dataActions.create({
        label,
        row,
        dateFormat,
        schema,
      });

      dispatch(createAction);
      dispatch(appActions.setActiveSchema(createAction.data.id));
    }
  ),
};
