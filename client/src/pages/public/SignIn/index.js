import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { sign as signValidate } from 'validation';
import { sign } from 'api';
import { toObjectValidationError } from 'helpers';
import store from 'store';
import { observer } from 'mobx-react-lite';
import logo from 'assets/logoBig.png';
import s from './style.scope.css';

const SignIn = observer(({ store }) => {
  const history = useHistory();
  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const onFinish = async values => {
    try {
      const { error, value } = signValidate.validate(values, { abortEarly: false });
      const errorsObject = toObjectValidationError(error);
      if (errorsObject !== null) {
        setError(errorsObject);
        return;
      }
      const { data } = await sign.create(value);
      store.setAuth(true);
      store.setUser(data);
      history.push('/');
      return;
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setError({ ...error, email: error.response.data.error });
      }
    }
  };

  return (
    <Row justify="center" align="middle" className={s.wrap}>
      <Row justify="center" align="middle" gutter={[0, 8]} className={s.formWrap}>

        <Col span={24}>
          <Link to="/">
            <img
              alt="Pokemon logo"
              src={logo}
              className={s.logo}
            />
          </Link>
        </Col>

        <Col span={24}>
          <Form
            name="signin"
            layout="vertical"
            scrollToFirstError
            className={s.form}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="E-mail"
              validateStatus={error.email && 'error' || false}
              help={error.email}
            >
              <Input name="email" type="email"/>
            </Form.Item>


            <Form.Item
              label="Password"
              name="password"
              validateStatus={error.password && 'error' || false}
              help={error.password}
            >
              <Input.Password name="password" type="password"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={s.button}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={24}>
          <Row justify="center" align="middle">
            <Typography.Text>or</Typography.Text>
          </Row>
        </Col>

        <div className={s.socWrap}>
          <a href="./api/v1/sign/gmail">
            <Button
              className={s.button}
              icon={<GoogleOutlined/>}
            >
              Sign up with Google
            </Button>
          </a>
        </div>

        <Col span={24} className={s.col}>
          <Row justify="center" align="middle">
            <Typography.Text>Don't have an account?</Typography.Text>
          </Row>
        </Col>

        <Col span={24} className={s.col}>
          <Row justify="center" align="middle">
            <Link to="/signup">
              <Button>
                Sign up here!
              </Button>
            </Link>
          </Row>
        </Col>

      </Row>

    </Row>
  );
});

export default () => <SignIn store={store}/>;
