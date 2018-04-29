import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Sticky, Menu } from 'semantic-ui-react';
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
    activeTab: ActiveBudget.tabs.INCOMES,
    contextRef: null,
  }

  isActiveTab = (tab) => {
    const { activeTab } = this.state;
    return tab === activeTab;
  }

  handleTabClick = (tab) => this.setState({ activeTab: tab });

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { contextRef } = this.state;

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
