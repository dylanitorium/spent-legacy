import React from 'react';
import ItemTable from 'view/components/pure/ItemTable'

const Expenses = props => <ItemTable {...props} title="Expenses Forecast" name="expense" namespace="expenses" />;

export default Expenses;
