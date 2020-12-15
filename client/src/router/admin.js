import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { Header } from 'components'
import * as AdminPages from 'pages/admin'

const { Footer, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <Header/>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          { children }
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

const Admin = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path="/admin/pokemon/add" component={AdminPages.PokemonAdd}/>
      </Switch>
    </AdminLayout>
  );
};

export default Admin;
