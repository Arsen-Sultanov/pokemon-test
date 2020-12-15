import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { Header, Drawer } from 'components';
import * as Public from 'pages/public';
import s from './style.scope.css';

const { Footer } = Layout;

const UserLayout = ({ children }) => {
  return (
    <Layout>
      <Header/>
      <Drawer/>
      <Layout>
        <Layout.Content className={s.main}>
          { children }
        </Layout.Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

const UserRouter = () => {
  return (
    <UserLayout>
      <Switch>
        <Route exact path="/" component={Public.Main}/>
        <Route exact path="/pokemon" component={Public.Main}/>
        <Route exact path="/pokemon/:id" component={Public.Pokemon}/>
      </Switch>
    </UserLayout>
  );
};

export default UserRouter;
