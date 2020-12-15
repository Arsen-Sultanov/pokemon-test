import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import { Row, Col, Pagination } from 'antd';
import { Card } from 'components';
import { pokemon } from 'api';

const Main = () => {
  const [data, setData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0
  });
  const location = useLocation();
  const search = qs.parse(location.search);

  const getData = async () => {
    try {
      const { data } = await pokemon.get({ ...search, ...pagination });
      setData(data.page);
      setTotalItemsCount(data.totalItemsCount);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [location.search, pagination]);

  const onChangePage = (page, limit) => {
    const skip = (page - 1) * limit;
    setPagination({ skip, limit });
  };

  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        {
          data.length > 0
            ? data.map(item => (
              <Col key={item._id}>
                <Card
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                />

              </Col>
            ))
            : null
        }
      </Row>
      {
        totalItemsCount > 0
          ? (
            <Row gutter={[32, 32]} justify="center">
              {console.log('sss', totalItemsCount)}
              <Pagination
                showSizeChanger
                pageSizeOptions={[5, 10, 15, 20]}
                total={Number.parseInt(totalItemsCount)}
                onChange={onChangePage}
              />
            </Row>
          )
          : null
      }


    </>
  );
};

export default Main;
