import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Button, Icon, Form, Input, Label } from 'semantic-ui-react';

export default class ItemTable extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        amount: PropTypes.string,
      })
    ).isRequired,
    createItem: PropTypes.func.isRequired,
  };

  state = {
    itemLabel: '',
    itemAmount: '',
    itemFrequency: '',
  }

  handleChange = name => (event, { value }) => {

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = () => {
    const {
      itemLabel: label,
      itemAmount: amount,
      itemFrequency: frequency,
    } = this.state;


    this.setState({
      itemLabel: '',
      itemAmount: '',
      itemFrequency: '',
    });

    this.props.createItem({
      label,
      amount,
      frequency,
    });
  };

  render() {
    const { items, frequencyOptions, name } = this.props;
    const { itemLabel, itemAmount, itemFrequency } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Table celled>
            <Table.Body>
              {
                items.length
                  ? items.map(item => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.label}</Table.Cell>
                      <Table.Cell>{item.amount}</Table.Cell>
                      <Table.Cell>{item.frequency}</Table.Cell>
                      <Table.Cell />
                    </Table.Row>
                  ))
                  : (
                    <Table.Row>
                      <Table.Cell colSpan={4} textAlign="center" style={{ fontStyle: 'italic' }}>Add an {name} below</Table.Cell>
                    </Table.Row>
                  )
              }
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell width={5}>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder="Label"
                      value={itemLabel}
                      onChange={this.handleChange('itemLabel')}
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
                        value={itemAmount}
                        onChange={
                          event => this.handleChange('itemAmount')(event, {
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
                      value={itemFrequency}
                      onChange={this.handleChange('itemFrequency')}
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
