import React from 'react';
import { Table } from 'semantic-ui-react';

const EventList = props => {
  const { items, for: Component } = props;

  return (
    <Table compact>
      <Table.Body>
        {
          items.map(item => (
            <Component key={item.id} {...item} />
          ))
        }
      </Table.Body>
    </Table>
  );
};

export default EventList;
