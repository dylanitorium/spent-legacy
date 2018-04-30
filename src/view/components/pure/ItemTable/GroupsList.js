import React, { Component } from 'react';

export default class GroupsList extends Component {
  render() {
    const { groups, groupsAs: GroupComponent, ...passThrough, } = this.props;

    if (!groups.length) {
      return (
        <div>
          Add a group by clicking the button to the top right.
        </div>
      );
    }

    return (
      <div>
        {
          groups.map(group => (
            <GroupComponent {...passThrough} key={group.id} {...group} />
          ))
        }
      </div>
    );
  }
}
