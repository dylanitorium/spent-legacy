import React from 'react';
import ItemTable from 'view/components/pure/ItemTable'
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const Expenses = props => <ItemTable {...props} title="Expenses Forecast" name="expense" namespace="expenses" />;

export default conditionalComponent(Expenses);
