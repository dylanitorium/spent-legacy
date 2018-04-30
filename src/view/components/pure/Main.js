import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';
import CreateBudgetForm from 'view/components/connected/CreateBudgetForm';
import Incomes from 'view/components/connected/Incomes';
import Expenses from 'view/components/connected/Expenses';
import BudgetOverview from 'view/components/connected/BudgetOverview';

class ActiveBudget extends Component {
  static tabs = {
    INCOMES: 'incomes',
    EXPENSES: 'expenses',
  }

  state = {
    activeTab: ActiveBudget.tabs.EXPENSES,
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
              <Menu.Item
                name={ActiveBudget.tabs.INCOMES}
                active={this.isActiveTab(ActiveBudget.tabs.INCOMES)}
                onClick={() => this.handleTabClick(ActiveBudget.tabs.INCOMES)}
              />
              <Menu.Item
                name={ActiveBudget.tabs.EXPENSES}
                active={this.isActiveTab(ActiveBudget.tabs.EXPENSES)}
                onClick={() => this.handleTabClick(ActiveBudget.tabs.EXPENSES)}
              />
            </Menu>
            <Incomes visible={this.isActiveTab(ActiveBudget.tabs.INCOMES)} />
            <Expenses visible={this.isActiveTab(ActiveBudget.tabs.EXPENSES)} />
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
