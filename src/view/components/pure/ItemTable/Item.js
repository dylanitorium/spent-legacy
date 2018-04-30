import React, { Component } from 'react';
import { Table, Button, Input, Select, Dropdown } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';

export default class Item extends Component {
  state = {
    locked: true
  }

  handleInputRef = (input) => {
    const { locked } = this.state;
    if (input !== null) {
      this.input = input;
      if (!locked) {
        this.input.focus();
      }
    }
  }

  toggleLock = () => {
    const { locked } = this.state;
    if (locked) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  }

  render() {
    const { id: itemId, label, frequencyOptions, amount, frequency, updateItem, deleteItem } = this.props;
    const { locked } = this.state;

    return (
      <Table.Row>
        <Table.Cell width={1} textAlign="center">
          <Button
            basic
            circular
            size="mini"
            icon={locked ? "lock" : "unlock alternate"}
            onClick={this.toggleLock}
          />
        </Table.Cell>
        <Table.Cell width={5}>
          {
            <Input
              fluid
              ref={this.handleInputRef}
              value={label}
              disabled={locked}
              placeholder="Label"
              onChange={(_e, { value }) => updateItem(itemId, { label: value })}
            />
          }
        </Table.Cell>
        <Table.Cell width={4}>
          <Input disabled={locked} fluid labelPosition='left' type='text' >
            <CurrencyInput
              value={`${amount}`}
              prefix="$"
              disabled={locked}
              placeholder="Amount"
              onChangeEvent={(_e, _v, value) => updateItem(itemId, { amount: value })}
            />
          </Input>
        </Table.Cell>
        <Table.Cell width={5}>
          <Select
            fluid
            options={frequencyOptions}
            value={frequency}
            disabled={locked}
            onChange={(_e, { value }) => updateItem(itemId, { frequency: value })}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <Dropdown icon='ellipsis vertical' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => deleteItem(itemId)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}
