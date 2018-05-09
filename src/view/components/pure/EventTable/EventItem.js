import React, { Component } from 'react';
import { Table, Input, Select, Dropdown } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';

export default class EventItem extends Component {

  handleInputRef = (input) => {
    if (input !== null) {
      this.input = input;
    }
  }

  render() {
    const {
      id,
      itemId,
      label,
      amount,
      reconciled,
      itemOptions,
      updateItem,
      deleteItem,
     } = this.props;

    return (
      <Table.Row>
        <Table.Cell width={3}>
          {
            <Input
              fluid
              ref={this.handleInputRef}
              value={label}
              disabled={reconciled}
              placeholder="Label"
              onChange={(_e, { value }) => updateItem(id, { label: value })}
            />
          }
        </Table.Cell>
        <Table.Cell width={3}>
          <Input disabled={reconciled} fluid labelPosition='left' type='text' >
            <CurrencyInput
              value={`${amount}`}
              prefix="$"
              disabled={reconciled}
              placeholder="Amount"
              onChangeEvent={(_e, _v, value) => updateItem(id, { amount: value })}
            />
          </Input>
        </Table.Cell>
        <Table.Cell width={3}>
          <Input
            fluid
            placeholder="Date"
            type="date"
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <Select
            placeholder="Select an item"
            options={itemOptions}
            disabled={reconciled}
            value={itemId}
            onChange={(_e, { value }) => updateItem(id, { itemId: value })}
          />
        </Table.Cell>
        <Table.Cell width={1} textAlign="center">
          <Dropdown icon='ellipsis vertical' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item disabled={!itemId} onClick={() => updateItem(id, { reconciled: !reconciled })}>
                { reconciled ? 'Unreconcile': 'Reconcile' }
              </Dropdown.Item>
              <Dropdown.Item onClick={() => deleteItem(id)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}
