const makeCreateWithBudgetId = (actions) => data => (
  (dispatch, getState) => {
    const {
      app: {
        budgets: {
          activeBudgetId
        }
      }
    } = getState();

    dispatch(actions.create({
      ...data,
      budgetId: activeBudgetId,
    }));
  }
);

export default makeCreateWithBudgetId;
