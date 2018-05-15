import React from 'react';
import { Table } from 'semantic-ui-react';
import TrackingBody from './TrackingBody';


const TrackingTable = (props) => {
  const { title, ...passThroughProps } = props;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {title}
          </Table.HeaderCell>
          <Table.HeaderCell>
            Expected
          </Table.HeaderCell>
          <Table.HeaderCell>
            Actual
          </Table.HeaderCell>
          <Table.HeaderCell>
            Variance
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <TrackingBody {...passThroughProps} />
    </Table>
  )
};

export default TrackingTable;