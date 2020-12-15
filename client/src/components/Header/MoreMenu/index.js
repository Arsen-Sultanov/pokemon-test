import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const MoreMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/signup">
        Sign Up
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/signin">
        Sign In
      </Link>
    </Menu.Item>
  </Menu>
);

export default MoreMenu;
