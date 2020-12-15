import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import Router from './router';
import 'antd/dist/antd.dark.css';

store.auth();

const App = () => {
  return (
    <>
      <Router/>
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
