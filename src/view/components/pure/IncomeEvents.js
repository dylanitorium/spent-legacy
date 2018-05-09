import React from 'react';
import IncomeEvent from 'view/components/connected/IncomeEvent';
import EventTable from 'view/components/pure/EventTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const IncomeEvents = props => (
  <EventTable
    {...props}
    for={IncomeEvent}
    title="Income Events"
    namespace="incomeEvents"
  />
);

export default conditionalComponent(IncomeEvents);
