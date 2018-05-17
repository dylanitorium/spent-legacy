import { dataActions } from './data';
import { appActions } from './app';
export { dataReducer } from './data';
export { appReducer } from './app';

export const actions = {
  ...dataActions,
  ...appActions,
  createSchema: (data) => (
    (dispatch) => {
      const createAction = dataActions.create({
        ...data,
        schema: JSON.parse(`{${data.schema}}`),
      });

      dispatch(createAction);
      dispatch(appActions.setActiveSchema(createAction.data.id));
    }
  ),
};
