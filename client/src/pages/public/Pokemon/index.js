import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Typography } from 'antd';
import { pokemon } from 'api';

import Stats from './Stats';
import Atribute from './Atribute';

import s from './style.scope.css';

const Pokemon = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const getData = async () => {
    try {
      const { data } = await pokemon.getById(id);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return data
    ? (
      <>

        <Row gutter={32}>
          <Col span={24}>
            <Typography.Title>{data.name}</Typography.Title>
          </Col>
        </Row>

        <Row gutter={[32, 32]}>

          <Col sm={24} md={9}>
            <Image
              width="100%"
              src={`http://localhost:8000/static/${data.image}`}
            />
          </Col>

          <Col sm={24} md={15}>

            <Row gutter={[32, 32]}>

              <Col span={24}>
                <Typography.Text className={s.basicText}>
                  {data.description}
                </Typography.Text>
              </Col>

              <Col span={24}>
                <Atribute
                  height={data.height}
                  weight={data.weight}
                  category={data.category}
                  abilities={data.abilities}
                />
              </Col>

              <Col span={24} className={s.stats}>
                <Stats
                  hp={data.hp}
                  speed={data.speed}
                  attack={data.attack}
                  defense={data.defense}
                />
              </Col>

            </Row>

          </Col>

        </Row>

      </>
    )
    : null;
};

export default Pokemon;
