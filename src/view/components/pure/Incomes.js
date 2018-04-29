import React from 'react';
import ItemTable from 'view/components/pure/ItemTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const Incomes = props => <ItemTable {...props} title="Incomes Forecast" name="income" namespace="incomes" />;

export default conditionalComponent(Incomes);
