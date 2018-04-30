import React from 'react';
import ItemTable from 'view/components/pure/ItemTable';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';
import IncomeGroup from 'view/components/connected/IncomeGroup';
import Income from 'view/components/connected/Income';

const Incomes = props => <ItemTable {...props} groupsAs={IncomeGroup} itemAs={Income} title="Incomes Forecast" name="income" namespace="incomes" />;

export default conditionalComponent(Incomes);
