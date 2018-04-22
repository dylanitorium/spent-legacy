import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const Header = props => (
  <Menu secondary className="spent-header">
    <Menu.Item header>
      Spent.
    </Menu.Item>
    {
      props.activeBudgetLabel
        ? (
          <Menu.Menu position="right">
            <Menu.Item header>
              {props.activeBudgetLabel}
            </Menu.Item>
          </Menu.Menu>
        )
        : null
    }
  </Menu>
);

Header.propTypes = {
  activeBudgetLabel: PropTypes.string,
}

Header.defaultProps = {
  activeBudgetLabel: undefined,
}

export default Header;
