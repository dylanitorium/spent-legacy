import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Form, Input, Label, Header, Checkbox, Dropdown } from 'semantic-ui-react';

class AddToGroupControl extends Component {
  static propTypes = {
    addGroup: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
  }

  static defaultProps = {
    groups: [],
    addGroup: () => {},
  }

  state = {
    groupName: '',
  };

  onChange = (event, { value: groupName }) => {
    this.setState({ groupName })
  }

  onDropdownChange = (event, data) => {
    if (event && event.key === "Enter") {
      this.onSubmit();
    }
  }

  onSubmit = () => {
    const { groupName } = this.state;
    this.setState({ groupName: '' });
    this.props.addGroup({ label: groupName });
  }

  render = () => {
    const { selectedItems, groups } = this.props;
    const { groupName } = this.state;

    return (
      <Dropdown
        text="Add to Group"
        icon="list"
        floating
        labeled
        button
        className="icon"
        disabled={!!selectedItems.length}
        onClose={this.onDropdownChange}
      >
        <Dropdown.Menu>
          <Input
            value={groupName}
            icon={{ name: 'plus', link: true, onClick: this.onSubmit, color: 'blue' }}
            className="search"
            placeholder="Add a group"
            onClick={e => e.stopPropagation()}
            onChange={this.onChange}
          />
          <Dropdown.Divider />
          <Dropdown.Header icon="list" content="Groups" />
          <Dropdown.Menu scrolling>
            {groups.map(group => <Dropdown.Item {...group} />)}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

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
    selectedItems: [],
  }

  handleChange = name => (event, { value }) => this.setState({ [name]: value })

  handleCheck = id => () => {
    const { selectedItems } = this.state;

    if (selectedItems.includes(id)) {
      this.setState({
        selectedItems: selectedItems.filter(({ id: _id }) => id !== _id),
      });
    } else {
      this.setState({
        selectedItems: [
          ...selectedItems,
          id,
        ]
      });
    }
  }

  isChecked = id => this.state.selectedItems.includes(id);

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

  deleteItem = id => () => this.props.deleteItem(id)

  render() {
    const { items, frequencyOptions, name } = this.props;
    const { itemLabel, itemAmount, itemFrequency, selectedItems } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', }}>
          <Header>{this.props.title}</Header>
          <AddToGroupControl {...this.props} selectedItems={selectedItems}/>
        </div>
          <Form onSubmit={this.handleSubmit}>
            <Table compact="very">
              <Table.Body>
                {
                  items.length
                    ? items.map(item => (
                      <Table.Row key={item.id}>
                        <Table.Cell><Checkbox onClick={this.handleCheck(item.id)} /></Table.Cell>
                        <Table.Cell>{item.label}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.frequency}</Table.Cell>
                        <Table.Cell style={{ textAlign: 'right' }}>
                          <Button icon negative onClick={this.deleteItem(item.id)} size="mini" compact circular>
                            <Icon name="delete" />
                          </Button>
                        </Table.Cell>
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
                  <Table.HeaderCell />
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
      </div>
    );
  }
}
