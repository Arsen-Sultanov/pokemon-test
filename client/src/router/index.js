import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as Public from 'pages/public';
import PublicRouter from './public';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Public.SignIn}/>
        <Route exact path="/signup" component={Public.SignUp}/>
        <Route exact path="/403" component={Public.ErrorAuthorized}/>
        <Route exact path="/404" component={Public.ErrorPageNotExist}/>
        <Route exact path="/500" component={Public.ErrorServer}/>
        <Route path="/" component={PublicRouter}/>
        <Route >
          <Redirect push to="/404"/>
        </Route>


      </Switch>
    </Router>
  );
};
