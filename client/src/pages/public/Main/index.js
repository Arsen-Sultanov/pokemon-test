import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Card, Pagination } from 'antd';
import { pokemon } from 'api';

const Main = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0
  });
  const location = useLocation();
  const search = qs.parse(location.search);

  const getData = async () => {
    try {
      console.log({ ...search, ...pagination }, pagination);
      const { data } = await pokemon.get({ ...search, ...pagination });
      setData(data.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [location.search, pagination]);

  const onChangePage = (page, limit) => {
    const skip = (page - 1) * 15;
    setPagination({ skip, limit });
  };

  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        {
          data.length > 0
            ? data.map(item => (
              <Col key={item._id}>
                <Link to={`/pokemon/${item._id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={item.name} src={`http://localhost:8000/static/${item.image}`} />}
                  >
                    <Card.Meta title={item.name} description={item.description} />
                  </Card>
                </Link>
              </Col>
            ))
            : null
        }
      </Row>
      <Row gutter={[32, 32]} justify="center">

        <Pagination
          showSizeChanger
          defaultCurrent={1}
          total={data.totalItemsCount}
          onChange={onChangePage}
        />

      </Row>
    </>
  );
};

export default Main;
