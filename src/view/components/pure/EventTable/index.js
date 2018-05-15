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

// const getData = async (file) => {
//   const reader = new FileReader();
//   reader.readAsText(file);
//   return new Promise((resolve) => {
//     reader.onloadend = () => resolve(reader.result);
//   });
// };

// const handleSelectFile = async (e) => {
//   const { files } = e.target;

//   if (files.length) {
//     const file = files[0];

//     const string = await getData(file);

//     console.log(string);
//   }
// };

const EventTable = props => {
  const { title, namespace, reconciledItems, unreconciledItems, createEvent, ...passThrough } = props;

  return (
    <div>
      <Flexed style={{ marginBottom: '1rem' }}>
        <Header>
          {title}
        </Header>
        <div>
          <CSVImportButton onChange={data => console.log(data)} style={{ marginRight: '1rem' }} />
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
