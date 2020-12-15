import React from 'react';
import { Row, Col, Typography, Progress } from 'antd';

import s from './style.scope.css';

const Stats = ({ hp, speed, attack, defense }) => {
  return (
    <>
      <Typography.Text className={s.basicText}>
        Stats
      </Typography.Text>

      <Row>
        <Col xs={24} sm={24} md={6}>
          <Typography.Text strong>HP</Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Progress strokeLinecap="square" percent={hp || 0} showInfo={false}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={6}>
          <Typography.Text strong>Speed</Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Progress strokeLinecap="square" percent={speed || 0} showInfo={false}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={6}>
          <Typography.Text strong>Attack</Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Progress strokeLinecap="square" percent={attack || 0} showInfo={false}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={6} >
          <Typography.Text strong>Defense</Typography.Text>
        </Col>
        <Col xs={24}sm={24} md={18}>
          <Progress strokeLinecap="square" percent={defense || 0} showInfo={false}/>
        </Col>
      </Row>

    </>
  );
};

export default Stats;
