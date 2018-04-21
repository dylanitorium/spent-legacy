import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button, Icon } from 'semantic-ui-react';

export default class CreateBudgetForm extends Component {
  static propTypes = {
    createBudget: PropTypes.func.isRequired,
  };

  state = {
    budgetName: '',
  };

  handleChange = (_e, { value: budgetName }) => {
    this.setState({
      budgetName,
    });
  }

  handleSubmit = () => {
    const { budgetName } = this.state;

    this.props.createBudget({
      label: budgetName
    });
  }

  render() {
    const { budgetName } = this.state;
    const { defaultBudgetName } = this.props;

    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ marginTop: '-3em', maxWidth: 300 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>{'Let\'s'} give your budget a name</label>
              <Form.Input placeholder={defaultBudgetName} value={budgetName} onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit'>Go <Icon name="arrow right"/></Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
};
