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

    console.log(groups);

    return (

      <div>
        {
          groups.map(group => (
            <GroupComponent key={group.id} {...passThrough} {...group} />
          ))
        }
      </div>
    );
  }
}
