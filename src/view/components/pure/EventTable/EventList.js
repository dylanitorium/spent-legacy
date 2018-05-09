import React from 'react';
import { Table } from 'semantic-ui-react';

const EventList = props => {
  const { items, for: Component } = props;

  return (
    <Table>
      <Table.Body>
        {
          items.length <= 0
            ? (
              <Table.Row>
                <Table.Cell>
                  You have no unreconciled events
                </Table.Cell>
              </Table.Row>
            )
            : (
              items.map(item => (
                <Component key={item.id} {...item} />
              ))
            )
        }
      </Table.Body>
    </Table>
  );
};

export default EventList;
