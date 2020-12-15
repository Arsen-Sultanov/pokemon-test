import React from 'react';
import { Row, Col, Statistic } from 'antd';

const Atribute = ({ height, weight, category, abilities }) => {
  return abilities !== undefined
    ? (
      <Row>

        <Col span={12}>
          <Statistic title="Height" value={height} />
          <Statistic title="Weight" value={weight} suffix="lbs"/>
        </Col>

        <Col span={12}>
          <Statistic title="Category" value={category} />
          <Statistic title="Abilities" value={abilities.join(', ')} />
        </Col>

      </Row>
    )
    : null;
};

export default Atribute;
