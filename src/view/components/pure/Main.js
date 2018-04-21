import React from 'react';
import PropTypes from 'prop-types';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';

const ActiveBudget = () => (
  <div>
    Everything else.
    Add a budgets item to the menu.
    Show default budget.
    Show budget edit screen.
  </div>
)
const Main = (props) => (
  <div className="spent-main">
    {props.hasBudgets ? <ActiveBudget /> : <CreateBudgetForm />}
  </div>
);

Main.propTypes = {
  hasBudgets: PropTypes.bool.isRequired,
};

export default Main;
