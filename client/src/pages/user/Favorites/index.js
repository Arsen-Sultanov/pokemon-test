import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Card } from 'components';
import { favorite } from 'api';

const Favorite = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await favorite.get();
      console.log(data.length);
      setData(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => getData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        {
          data.length > 0
            ? data.map(item => (
              <Col key={item.pokemon[0]._id}>

                <Card
                  id={item.pokemon[0]._id}
                  deleteId={item._id}
                  name={item.pokemon[0].name}
                  image={item.pokemon[0].image}
                  description={item.pokemon[0].description}
                  onDelete={onDelete}
                />

              </Col>
            ))
            : null
        }
      </Row>
    </>
  );
};

export default Favorite;
