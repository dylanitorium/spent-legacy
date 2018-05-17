import React from 'react';
import ExpenseEvent from 'view/components/connected/ExpenseEvent';
import CSVImportButton from 'view/components/connected/CSVImportButton';
import EventTable from 'view/components/pure/EventTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const ExpenseEvents = props => (
  <EventTable
    {...props}
    for={ExpenseEvent}
    title="Expense Events"
    namespace="expenseEvents"
    importButtonAs={CSVImportButton}
  />
);

export default conditionalComponent(ExpenseEvents);
