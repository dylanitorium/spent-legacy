import React from 'react';
import { Select, Divider } from 'semantic-ui-react';
import { FREQUENCY_OPTIONS } from 'state/constants';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';
import TrackingTable from './TrackingTable';

const Tracking = (props) => {
  const { trackingPeriod, updatePeriod, tracks } = props;

  return (
    <div>
      <Select
        options={FREQUENCY_OPTIONS}
        value={trackingPeriod}
        onChange={(_e, { value }) => updatePeriod(value)}
      />
      <Divider />
      <TrackingTable title="Income" tracks={tracks} />
    </div>
  )
}
export default conditionalComponent(Tracking);
