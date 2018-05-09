import React from 'react';
import { Header, Button, Table } from 'semantic-ui-react';
import Flexed from 'view/components/pure/Flexed';
import EventList from './EventList';

const SingleCell = ({ children }) => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          {children}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

const EventTable = props => {
  const { title, namespace, reconciledItems, unreconciledItems, createEvent, ...passThrough } = props;

  return (
    <div>
      <Flexed style={{ marginBottom: '1rem' }}>
        <Header>
          {title}
        </Header>
        <Button
          content="Add Event"
          icon="plus"
          labelPosition="left"
          onClick={() => createEvent()}
        />
      </Flexed>
      {
        unreconciledItems.length > 0
          ? (
            <EventList {...passThrough} items={unreconciledItems} />
          )
          : (
            <SingleCell>
              You have no unreconciled events
            </SingleCell>
          )
      }
      <Header>
        Reconciled Events
      </Header>
      {
        reconciledItems.length > 0
          ? <EventList {...passThrough} items={reconciledItems} />
          : (
            <SingleCell>
              You have no reconciled events
            </SingleCell>
          )
      }
    </div>
  )
}

export default EventTable;