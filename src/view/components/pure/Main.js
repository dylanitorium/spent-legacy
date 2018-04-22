import React from 'react';
import PropTypes from 'prop-types';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';
import Incomes from 'view/components/connected/Incomes';

const ActiveBudget = props => (
  <Incomes />
);

const Main = (props) => (
  <div className="spent-main">
    {props.hasBudgets ? <ActiveBudget /> : <CreateBudgetForm />}
  </div>
);

Main.propTypes = {
  hasBudgets: PropTypes.bool.isRequired,
};

export default Main;
