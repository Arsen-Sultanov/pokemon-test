import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { sign } from 'api';
import { observer } from 'mobx-react-lite';
import store from 'store';

const AvatarMenu = observer(({ store }) => {
  const onExitClick = async () => {
    try {
      await sign.delete();
      store.setAuth(false);
      store.setUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu>
      <Menu.Item>
        <Link to="/favorite">
          Favorite
        </Link>
      </Menu.Item>
      <Menu.Item onClick={onExitClick}>
        Exit
      </Menu.Item>
    </Menu>
  );
});

export default () => <AvatarMenu store={store}/>;
