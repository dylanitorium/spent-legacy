import React from 'react';
import { Select, Table, Divider } from 'semantic-ui-react';
import { FREQUENCY_OPTIONS } from 'state/constants';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const Tracking = props => (
  <div>
    <Select
      options={FREQUENCY_OPTIONS}
      value={props.trackingPeriod}
      onChange={(_e, { value }) => props.updatePeriod(value)}
    />
    <Divider />
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Income
          </Table.HeaderCell>
          <Table.HeaderCell>
            Expected
          </Table.HeaderCell>
          <Table.HeaderCell>
            Actual
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.incomeTracks.length > 0 ? props.incomeTracks.map(track => (
            <Table.Row>
              <Table.Cell>
                {track.label}
              </Table.Cell>
              <Table.Cell>
                {track.expected}
              </Table.Cell>
              <Table.Cell>
                {track.actual}
              </Table.Cell>
            </Table.Row>
          )) : (
            <Table.Row>
              <Table.Cell colSpan={3}>
              Coming soon
              </Table.Cell>
            </Table.Row>
          )
        }
      </Table.Body>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Expense
          </Table.HeaderCell>
          <Table.HeaderCell>
            Expected
          </Table.HeaderCell>
          <Table.HeaderCell>
            Actual
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>

      </Table.Body>
    </Table>
  </div>
);

export default conditionalComponent(Tracking);
