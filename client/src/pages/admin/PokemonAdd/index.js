import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import s from './style.scope.css';

const PokemonAdd = () => {
  return (
      <Row wrap={false} gutter={24}>
        <Col>
          <Skeleton.Image style={{ width: 250, height: 250 }} active={true} size="large" shape="square"/>
        </Col>
        <Row style={{ width: '100%', alignItems: 'center'}}>
          <Skeleton active className={s.skeletonInput} size="large"/>
        </Row>
      </Row>
  )
}

export default PokemonAdd;