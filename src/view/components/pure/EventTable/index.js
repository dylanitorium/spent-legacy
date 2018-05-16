import React from 'react';
import { Header, Button, Table, Input } from 'semantic-ui-react';
import Flexed from 'view/components/pure/Flexed';
import CSVImportButton from 'view/components/pure/CSVImportButton';
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
  const { title, namespace, reconciledItems, unreconciledItems, createEvent, createEventsFromImport, ...passThrough } = props;

  return (
    <div>
      <Flexed style={{ marginBottom: '1rem' }}>
        <Header>
          {title}
        </Header>
        <div>
          <CSVImportButton headerConfig={{
            row: 2,
            schema: {
            'Transaction Date': 'date',
            'Amount': 'amount',
            'Reference': 'label',
          }}} onImport={createEventsFromImport} style={{ marginRight: '1rem' }} onError={e => console.log(e)} />
          <Button
            content="Add Event"
            icon="plus"
            labelPosition="left"
            onClick={() => createEvent()}
          />
        </div>
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
