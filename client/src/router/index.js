import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Public from 'pages/public';
import UserRouter from './user';
import Admin from './admin';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Public.SignIn}/>
        <Route exact path="/signup" component={Public.SignUp}/>
        <Route exact path="/403" component={Public.ErrorAuthorized}/>
        <Route exact path="/404" component={Public.ErrorPageNotExist}/>
        <Route exact path="/500" component={Public.ErrorServer}/>

        <Route path="/admin" component={Admin}/>
        <Route path="/" component={UserRouter}/>
        <Route exact path="*" component={Public.ErrorPageNotExist}/>


      </Switch>
    </Router>
  );
};
