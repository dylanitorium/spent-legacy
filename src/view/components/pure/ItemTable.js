import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Header, Select, Dropdown } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input'

const Flexed = ({ children, style }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>
    {children}
  </div>
)

class TitleSection extends Component {
  render() {
    const { title, namespace, createGroup } = this.props;

    return (
      <Flexed style={{ marginBottom: '1rem' }}>
        <Header>
          {title}
        </Header>

        <Button
          content="Add Group"
          icon="plus"
          labelPosition="left"
          onClick={() => createGroup({ namespace })}
        />
      </Flexed>
    );
  }
}

class Item extends Component {
  state = {
    locked: false
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

class Group extends Component {
  state = {
    locked: false
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
    const { id: groupId, label, items, name, createItem, updateGroup, deleteGroup, ...passThrough } = this.props;
    const { locked } = this.state;

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} textAlign="center">
              <Button
                basic
                circular
                icon={locked ? "lock" : "unlock alternate"}
                onClick={this.toggleLock}
              />
            </Table.HeaderCell>
            <Table.HeaderCell width={5}>
              <Input
                ref={this.handleInputRef}
                value={label}
                disabled={locked}
                onChange={(_e, { value }) => updateGroup(groupId, { label: value })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell width={4} />
            <Table.HeaderCell width={5} textAlign="right">
              <Button
                content={`Add ${name}`}
                icon="plus"
                labelPosition="left"
                compact
                onClick={() => createItem({ groupId })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              <Dropdown icon='ellipsis vertical' className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteGroup(groupId)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            items.map(item => (
              <Item {...passThrough} key={item.id} {...item} />
            ))
          }
        </Table.Body>
      </Table>
    );
  }
}

class GroupsList extends Component {
  render() {
    const { groups, ...passThrough } = this.props;

    if (!groups.length) {
      return (
        <div>
          Add a group by clicking the button to the top right.
        </div>
      );
    }

    return (
      <div>
        {
          groups.map(group => (
            <Group {...passThrough} key={group.id} {...group} />
          ))
        }
      </div>
    );
  }
}

export default class ItemTable extends Component {
  render() {
    return (
      <div>
        <TitleSection {...this.props} />
        <GroupsList {...this.props} />
      </div>
    );
  }
};
// title="Incomes Forecast" name="income source" namespace="incomes"
