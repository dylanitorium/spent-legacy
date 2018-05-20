import React, { Component } from 'react';
import { Table, Input, Select, Dropdown } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';
import moment from 'moment';

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
      reference,
      accountName,
      particulars,
      code,
      amount,
      date,
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
              value={reference}
              disabled={reconciled}
              placeholder="Reference"
              onChange={(_e, { value }) => updateItem(id, { reference: value })}
            />
          }
        </Table.Cell>
        <Table.Cell width={3}>
          {
            <Input
              fluid
              ref={this.handleInputRef}
              value={accountName}
              disabled={reconciled}
              placeholder="Account Name"
              onChange={(_e, { value }) => updateItem(id, { accountName: value })}
            />
          }
        </Table.Cell>
        <Table.Cell width={3}>
          {
            <Input
              fluid
              ref={this.handleInputRef}
              value={particulars}
              disabled={reconciled}
              placeholder="Particulars"
              onChange={(_e, { value }) => updateItem(id, { particulars: value })}
            />
          }
        </Table.Cell>
        <Table.Cell width={3}>
          {
            <Input
              fluid
              ref={this.handleInputRef}
              value={code}
              disabled={reconciled}
              placeholder="Code"
              onChange={(_e, { value }) => updateItem(id, { code: value })}
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
            value={date}
            disabled={reconciled}
            type="date"
            onChange={(_e, { value }) => updateItem(id, { date: value })}
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
