import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import GroupsList from './GroupsList';

const Flexed = ({ children, style }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>
    {children}
  </div>
)

class TitleSection extends Component {
  render() {
    const { title, namespace, createGroup } = this.props;

    return (
      <Flexed style={{ marginBottom: '1rem' }}>
        <Header>
          {title}
        </Header>
        <Button
          content="Add Group"
          icon="plus"
          labelPosition="left"
          onClick={() => createGroup({ namespace })}
        />
      </Flexed>
    );
  }
}

export default class ItemTable extends Component {
  render() {
    return (
      <div>
        <TitleSection {...this.props} />
        <GroupsList {...this.props} />
      </div>
    );
  }
};
