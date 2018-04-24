import { FREQUENCY_MAP } from 'state/constants';

const makeCreateAmountableWithBudgetId = (reducerName, label, actions) => data => (
  (dispatch, getState) => {
    const {
      app: {
        budgets: {
          activeBudgetId
        }
      },
      data: {
        [reducerName]: {
          index
        }
      }
    } = getState();

    dispatch(actions.create({
      label: data.label || `${label} ${index + 1}`,
      amount: parseFloat(data.amount, 2) || 0,
      frequency: data.frequency || FREQUENCY_MAP.YEAR,
      budgetId: activeBudgetId,
    }));
  }
);

export default makeCreateAmountableWithBudgetId;
