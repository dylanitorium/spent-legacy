import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Sticky } from 'semantic-ui-react';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';
import Incomes from 'view/components/connected/Incomes';
import Expenses from 'view/components/connected/Expenses';
import BudgetOverview from 'view/components/connected/BudgetOverview';

class ActiveBudget extends Component {
  state = {}

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { contextRef } = this.state;

    return (
      <div>
        <Grid padded>
          <Grid.Column width={12}>
              <Incomes />
              <Divider />
              <Expenses />
          </Grid.Column>
          <Grid.Column width={4}>
            <div ref={this.handleContextRef}>
              <Sticky context={contextRef}>
                <BudgetOverview />
              </Sticky>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const Main = (props) => (
  <div className="spent-main">
    {props.hasBudgets ? <ActiveBudget /> : <CreateBudgetForm />}
  </div>
);

Main.propTypes = {
  hasBudgets: PropTypes.bool.isRequired,
};

export default Main;
