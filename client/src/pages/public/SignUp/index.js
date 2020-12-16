import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { user as userValidate } from 'validation';
import { toObjectValidationError } from 'helpers';
import { user } from 'api';
import logo from 'assets/logoBig.png';
import s from './style.scope.css';

const SignUp = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState({
    email: '',
    username: '',
    password: '',
    confirm: ''
  });

  const onFinish = async values => {
    try {
      const { error, value } = userValidate.validate(values, { abortEarly: false });
      const errorsObject = toObjectValidationError(error);
      console.log(value);
      if (errorsObject !== null) {
        setError(errorsObject);
        return;
      }
      await user.create(value);
      history.push('/signin');
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
            form={form}
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
              label="Username"
              name="username"
              validateStatus={error.username && 'error' || false}
              help={error.username}
            >
              <Input name="username" type="text"/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              validateStatus={error.password && 'error' || false}
              help={error.password}
            >
              <Input.Password name="password" type="password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              validateStatus={error.confirm && 'error' || false}
              help={error.confirm}
            >
              <Input.Password name="password" type="password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={s.button}>
                Sign Up
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
          <Col span={24}>
            <a href="./api/v1/sign/gmail">
              <Button
                className={s.button}
                icon={<GoogleOutlined/>}
              >
                Sign up with Google
              </Button>
            </a>
          </Col>
        </div>

        <Col span={24} className={s.col}>
          <Row justify="center" align="middle">
            <Typography.Text>Already have an account?</Typography.Text>
          </Row>
        </Col>

        <Col span={24} className={s.col}>
          <Row justify="center" align="middle">
            <Link to="/signin">
              <Button>
                Sign in here!
              </Button>
            </Link>
          </Row>
        </Col>

      </Row>

    </Row>
  );
};

export default SignUp;
