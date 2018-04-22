import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Divider, Statistic } from 'semantic-ui-react';

const BudgetData = props => (
  <div>
  <Header>Overview (annual)</Header>
  <Segment>
    <Header>Incomes</Header>
    <div style={{ textAlign: 'right' }}>
      <Statistic value={props.incomesTotal} size="mini" />
    </div>
    <Divider />
    <Header>Expenses</Header>
    <div style={{ textAlign: 'right' }}>
      <Statistic value={props.expensesTotal} size="mini" />
    </div>
    <Divider />
    <Header>Balance</Header>
    <div style={{ textAlign: 'right' }}>
      <Statistic value={props.budgetBalance} size="mini" />
    </div>
    <Divider />
  </Segment>
  </div>
);

BudgetData.propTypes = {
  incomes: PropTypes.array.isRequired,
  incomesTotal: PropTypes.string.isRequired,
  expenses: PropTypes.array.isRequired,
  expensesTotal: PropTypes.string.isRequired,
  budgetBalance: PropTypes.string.isRequired,
};

export default BudgetData;
