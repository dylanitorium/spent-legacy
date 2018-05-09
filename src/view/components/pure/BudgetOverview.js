import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Divider, Statistic, Select } from 'semantic-ui-react';

const BudgetData = props => (
  <div>
    <Segment>
      <Select
        options={props.frequencyOptions}
        value={props.activeFrequency}
        onChange={(_e, { value }) => props.updateFrequency(value)}
        fluid
      />
      <Header>Incomes</Header>
      <div>
        {props.incomes.map(group => (
          <div key={group.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>{group.label}</div>
            <div>{group.amount}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'right' }}>
        <Statistic value={props.incomesTotal} size="mini" />
      </div>
      <Divider />
      <Header>Expenses</Header>
      <div>
        {props.expenses.map(group => (
          <div key={group.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>{group.label}</div>
            <div>{group.amount}</div>
          </div>
        ))}
      </div>
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
