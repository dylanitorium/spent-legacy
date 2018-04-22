import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const Header = props => (
  <Menu secondary className="spent-header">
    <Menu.Item header>
      Spent.
    </Menu.Item>
    {
      props.activeBudget
        ? (
          <Menu.Menu position="right">
            <Menu.Item header>
              {props.activeBudget.label}
            </Menu.Item>
          </Menu.Menu>
        )
        : null
    }
  </Menu>
);

Header.propTypes = {
  activeBudget: PropTypes.bool.isRequired,
}

export default Header;
