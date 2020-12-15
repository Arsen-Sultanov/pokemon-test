import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card as AntdCard } from 'antd';
import { PlusOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import store from 'store';
import { favorite } from 'api';

const Card = observer(({ store, id, deleteId, name, image, description, onDelete }) => {
  const add = async (pokemonId) => {
    try {
      favorite.add({ pokemonId });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavarite = async (pokemonId) => {
    try {
      await favorite.delete({ pokemonId });
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AntdCard
      hoverable
      style={{ width: 240 }}
      cover={<img alt={name} src={`http://localhost:8000/static/${image}`} />}
      actions={[
        useRouteMatch('/favorite')
          ? <DeleteOutlined key={1} onClick={() => deleteFavarite(deleteId)}/>
          : <PlusOutlined key={1} onClick={() => add(id)}/>,
        <Link key={2} to={`/pokemon/${id}`}>
          <ArrowRightOutlined />
        </Link>
      ]}
    >
      <AntdCard.Meta title={name} description={`${description.slice(0, 40)}...`} />
    </AntdCard>
  );
});

export default (props) => <Card {...props} store={store} />;
