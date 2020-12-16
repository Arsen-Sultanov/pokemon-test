import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from 'store';
import { Header, Drawer } from 'components';
import * as Public from 'pages/public';
import * as User from 'pages/user';
import s from './style.scope.css';


const PublicLayout = ({ children }) => {
  return (
    <Layout>
      <Header/>
      <Drawer/>
      <Layout>
        <Layout.Content className={s.main}>
          { children }
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const PublicRouter = observer(({ store }) => {
  return (
    <PublicLayout>
      <Switch>
        { store.isAuth && (<Route exact path="/favorite" component={User.Favorite}/>) }
        <Route exact path="/" component={Public.Main}/>
        <Route exact path="/pokemon" component={Public.Main}/>
        <Route exact path="/pokemon/:id" component={Public.Pokemon}/>
        <Route>
          <Redirect push to="/404"/>
        </Route>
      </Switch>
    </PublicLayout>
  );
});

export default () => <PublicRouter store={store} />;
