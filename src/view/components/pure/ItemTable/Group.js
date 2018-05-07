import React, { Component } from 'react';
import { Table, Button, Input, Dropdown, Checkbox } from 'semantic-ui-react'
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const GroupBody = conditionalComponent(({ items, itemsAs: ItemComponent }) => (
  <Table.Body>
    {
      items.map(item => (
        <ItemComponent key={item.id} {...item}  />
      ))
    }
  </Table.Body>
));

export default class Group extends Component {
  state = {
    locked: false,
    collapsed: false,
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

  toggleLock = () => this.setState({ locked: !this.state.locked });
  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    const { id: groupId, label, name, excluded, createItem, updateGroup, deleteGroup, toggleExclude, ...passThrough } = this.props;
    const { locked, collapsed } = this.state;

    return (
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell verticalAlign="middle">
              <Checkbox checked={!excluded} onClick={() => toggleExclude(groupId)} />
            </Table.HeaderCell>
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
            <Table.HeaderCell width={1} textAlign="center">
              <Dropdown icon='ellipsis vertical' className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteGroup(groupId)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              <Button
                basic
                circular
                size="mini"
                compact
                icon={collapsed ? "chevron down" : "chevron up"}
                onClick={this.toggleCollapse}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <GroupBody {...passThrough} visible={!this.state.collapsed}/>
      </Table>
    );
  }
}
