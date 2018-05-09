import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class GroupsList extends Component {
  render() {
    const { groups, groupsAs: GroupComponent, ...passThrough, } = this.props;

    if (!groups.length) {
      return (
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                You have not added any groups yet
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }

    return (

      <div>
        {
          groups.map(group => (
            <GroupComponent key={group.id} {...passThrough} {...group} />
          ))
        }
      </div>
    );
  }
}
