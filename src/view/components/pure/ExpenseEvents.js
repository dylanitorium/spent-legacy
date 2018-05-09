import React from 'react';
import ExpenseEvent from 'view/components/connected/ExpenseEvent';
import EventTable from 'view/components/pure/EventTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const ExpenseEvents = props => (
  <EventTable
    {...props}
    for={ExpenseEvent}
    title="Expense Events"
    namespace="expenseEvents"
  />
);

export default conditionalComponent(ExpenseEvents);
