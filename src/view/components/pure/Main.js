import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Segment } from 'semantic-ui-react';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';
import Incomes from 'view/components/connected/Incomes';
import Expenses from 'view/components/connected/Expenses';

const ActiveBudget = () => (
  <div>
    <Container>
      <Header>Incomes Forecast</Header>
      <Segment>
        <Incomes />
      </Segment>
      <Header>Expenses Forecast</Header>
      <Segment>
        <Expenses />
      </Segment>
    </Container>
  </div>
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
