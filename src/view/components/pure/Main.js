import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';
import Incomes from 'view/components/connected/Incomes';
import Expenses from 'view/components/connected/Expenses';
import BudgetOverview from 'view/components/connected/BudgetOverview';
import IncomeEvents from 'view/components/connected/IncomeEvents';
import ExpenseEvents from 'view/components/connected/ExpenseEvents';
import IncomeTracking from 'view/components/connected/IncomeTracking';
import ExpenseTracking from 'view/components/connected/ExpenseTracking';
import Schemas from 'view/components/connected/Schemas';

class ActiveBudget extends Component {
  static tabs = {
    INCOMES: 'incomes',
    EXPENSES: 'expenses',
    INCOME_EVENTS: 'income events',
    EXPENSE_EVENTS: 'expense events',
    INCOME_TRACKING: 'income tracking',
    EXPENSE_TRACKING: 'expense tracking',
    SCHEMAS: 'schemas',
  }

  state = {
    activeTab: ActiveBudget.tabs.INCOME_EVENTS,
    contextRef: null,
  }

  isActiveTab = tab => this.state.activeTab === tab;

  handleTabClick = tab => this.setState({ activeTab: tab });

  render() {
    return (
      <div>
        <Grid padded>
          <Grid.Column width={12}>
            <Menu pointing secondary>
              {
                Object.keys(ActiveBudget.tabs).map(tab => (
                  <Menu.Item
                    key={tab}
                    name={ActiveBudget.tabs[tab]}
                    active={this.isActiveTab(ActiveBudget.tabs[tab])}
                    onClick={() => this.handleTabClick(ActiveBudget.tabs[tab])}
                  />
                ))
              }
            </Menu>
            <Incomes visible={this.isActiveTab(ActiveBudget.tabs.INCOMES)} />
            <Expenses visible={this.isActiveTab(ActiveBudget.tabs.EXPENSES)} />
            <IncomeEvents visible={this.isActiveTab(ActiveBudget.tabs.INCOME_EVENTS)} />
            <ExpenseEvents visible={this.isActiveTab(ActiveBudget.tabs.EXPENSE_EVENTS)} />
            <IncomeTracking visible={this.isActiveTab(ActiveBudget.tabs.INCOME_TRACKING)} />
            <ExpenseTracking visible={this.isActiveTab(ActiveBudget.tabs.EXPENSE_TRACKING)} />
            <Schemas visible={this.isActiveTab(ActiveBudget.tabs.SCHEMAS)} />
          </Grid.Column>
          <Grid.Column width={4}>
            <BudgetOverview />
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
