import React from 'react';
import { Table } from 'semantic-ui-react';

const TrackingItem = (props) => {
  const { id, positive, label, expected, actual, variance } = props;

  return (
    <Table.Row key={id} negative={!positive} positive={positive}>
      <Table.Cell>
        {label}
      </Table.Cell>
      <Table.Cell>
        {expected}
      </Table.Cell>
      <Table.Cell>
        {actual}
      </Table.Cell>
      <Table.Cell>
        {variance}
      </Table.Cell>
    </Table.Row>
  );
};

export default TrackingItem;