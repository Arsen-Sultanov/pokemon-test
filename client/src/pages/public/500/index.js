import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const ErrorServer = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link to='/'>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default ErrorServer;
