import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import Flexed from 'view/components/pure/Flexed';
import EventList from './EventList';

const EventTable = props => {
  const { title, namespace, createEvent, ...passThrough } = props;

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
      <EventList {...passThrough} />
    </div>
  )
}

export default EventTable;
