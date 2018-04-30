import React, { Component } from 'react';
import { Table, Button, Input, Dropdown } from 'semantic-ui-react'

export default class Group extends Component {
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
    const { id: groupId, itemAs: ItemComponent, label, items, name, createItem, updateGroup, deleteGroup, ...passThrough } = this.props;
    const { locked } = this.state;

    return (
      <Table compact>
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
              <ItemComponent key={item.id} {...passThrough} {...item}  />
            ))
          }
        </Table.Body>
      </Table>
    );
  }
}
