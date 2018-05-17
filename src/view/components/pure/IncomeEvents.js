import React from 'react';
import IncomeEvent from 'view/components/connected/IncomeEvent';
import CSVImportButton from 'view/components//connected/CSVImportButton';
import EventTable from 'view/components/pure/EventTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const IncomeEvents = props => (
  <EventTable
    {...props}
    for={IncomeEvent}
    title="Income Events"
    namespace="incomeEvents"
    importButtonAs={CSVImportButton}
  />
);

export default conditionalComponent(IncomeEvents);
