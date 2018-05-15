import React from 'react';
import { Table } from 'semantic-ui-react';
import TrackingItem from './TrackingItem';

const TrackingBody = (props) => {
  const { tracks } = props;
  return tracks.length > 0 ? tracks.map(group => {
    const Header = () =>  (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={4}>
            {group.label}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const Body = () => (
      <Table.Body>
        {
          group.items.map(item => (
            <TrackingItem key={item.id} {...item} />
          ))
        }
      </Table.Body>
    )

    return [<Header key={`group-header-${group.id}`} />, <Body key={`group-body-${group.id}`} />];
  }) : null
};

export default TrackingBody;