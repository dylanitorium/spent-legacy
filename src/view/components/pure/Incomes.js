import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Table, Button, Icon, Form, Input, Label } from 'semantic-ui-react';

export default class Incomes extends Component {
  static propTypes = {
    incomes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        amount: PropTypes.string,
      })
    ).isRequired,
  };

  state = {
    incomeLabel: '',
    incomeAmount: '',
    incomeFrequency: '',
  }

  handleChange = name => (event, { value }) => {
    // const { value } = event.target;
    // console.log(event);
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = () => {
    const {
      incomeLabel: label,
      incomeAmount: amount,
      incomeFrequency: frequency,
    } = this.state;

    console.log(frequency);

    this.props.createIncome({
      label,
      amount,
      frequency,
    });
  };

  render() {
    const { incomes, frequencyOptions } = this.props;
    const { incomeLabel, incomeAmount } = this.state;

    return (
      <Container>
        <Header>Incomes Forecast</Header>
        <Form onSubmit={this.handleSubmit}>
          <Table celled>
            <Table.Body>
              {
                incomes.map(income => (
                  <Table.Row key={income.id}>
                    <Table.Cell>{income.label}</Table.Cell>
                    <Table.Cell>{income.amount}</Table.Cell>
                    <Table.Cell>{income.frequency}</Table.Cell>
                    <Table.Cell />
                  </Table.Row>
                ))
              }
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell width={5}>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder="Label"
                      value={incomeLabel}
                      onChange={this.handleChange('incomeLabel')}
                    />
                  </Form.Field>
                </Table.HeaderCell>
                <Table.HeaderCell width={5}>
                  <Form.Field>
                    <Input
                      fluid
                      labelPosition='left'
                      type='text'
                      placeholder='Amount'
                    >
                      <Label basic>$</Label>
                      <input
                        type="number" min="0.00" step="0.01"
                        value={incomeAmount}
                        onChange={
                          event => this.handleChange('incomeAmount')(event, {
                            value: event.target.value
                          })
                        }
                      />
                    </Input>
                  </Form.Field>
                </Table.HeaderCell>
                <Table.HeaderCell width={5}>
                  <Form.Field>
                    <Form.Select
                      fluid
                      placeholder='Frequency'
                      options={frequencyOptions}
                      onChange={this.handleChange('incomeFrequency')}
                    />
                  </Form.Field>
                </Table.HeaderCell>
                <Table.HeaderCell width={1}>
                  <Button
                    type="submit"
                    icon
                    labelPosition='left'
                    primary
                    size='small'
                  >
                    <Icon name='plus' /> Add
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          </Form>
      </Container>
    );
  }
}
