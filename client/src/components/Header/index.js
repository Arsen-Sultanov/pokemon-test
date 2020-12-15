import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Avatar, Dropdown, Button } from 'antd';
import { MenuUnfoldOutlined, EllipsisOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import store from 'store';
import AvatarMenu from './AvatarMenu';
import MoreMenu from './MoreMenu';
import logo from 'assets/logo.png';
import s from './style.scope.css';


const { Header: AntHeader } = Layout;

const Logo = () => (
  <Link to="/">
    <img
      alt="Pokemon logo"
      src={logo}
      className={s.logoImg}
    />
  </Link>
);

const Header = observer(({ store }) => {
  return (
    <AntHeader>
      <Row justify="space-between" align="middle">

        <Row gutter={[16, 0]}>
          <Col>
            <Button
              size="large"
              icon={<MenuUnfoldOutlined />}
              onClick={() => {
                store.setDrawerVisibility();
              }}
            />
          </Col>
          <Col xs={0} sm={4}>
            <Logo/>
          </Col>

        </Row>

        <Col xs={8} sm={0}>
          <Logo/>
        </Col>

        <Row gutter={[16, 0]}>
          {
            store.isAuth
              ? (
                <Col>
                  <Dropdown overlay={AvatarMenu} placement="bottomCenter">
                    <Avatar>
                      {
                        store.user.username === undefined
                          ? store.user.username[0].toUpperCase()
                          : 'U'
                      }
                    </Avatar>
                  </Dropdown>
                </Col>
              )
              : (
                <>
                  <Col xs={0} sm={12}>
                    <Link to="/signup">
                      <Button type="primary" size="large">
                        Sign Up
                      </Button>
                    </Link>
                  </Col>

                  <Col xs={0} sm={12}>
                    <Link to="/signin">
                      <Button size="large">
                        Sign In
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={24} sm={0}>
                    <Dropdown overlay={MoreMenu}>
                      <Button
                        size="large"
                        icon={<EllipsisOutlined />}
                      />
                    </Dropdown>
                  </Col>
                </>
              )
          }
        </Row>

      </Row>
    </AntHeader>
  );
});

export default () => <Header store={store}/>;
