import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { Drawer as AntdDrawer, Row, Col, Form, Input, InputNumber, Button, Slider, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import store from 'store';

const Drawer = observer(({ store }) => {
  const history = useHistory();
  const [state, setState] = useState({
    heightFrom: null,
    heightTo: null,
    weightFrom: null,
    weightTo: null,
    HPFrom: null,
    HPTo: null,
    attackFrom: null,
    attackTo: null,
    defenseFrom: null,
    defenseTo: null,
    specialAttackFrom: null,
    specialAttackTo: null,
    specialDefenseFrom: null,
    specialDefenseTo: null,
    speedFrom: null,
    speedTo: null,
    category: null,
    abilities: []
  });

  const formSubmit = () => {
    const query = qs.stringify(state, { skipNull: true, arrayFormat: 'index' });
    history.push(`/pokemon?${query}`);
  };

  const sliderConfig = {
    range: true,
    min: 0,
    max: 400,
    defaultValue: [0, 400]
  };

  return (
    <AntdDrawer
      placement={'left'}
      closable={true}
      visible={store.drawerIsVisible}
      onClose={() => store.setDrawerVisibility()}
    >

      <Form
        onFinish={formSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <span htmlFor="name">Name:</span>
            <Input
              name="name"
              placeholder="Ninetales"
              onChange={value => setState({ ...state, name: value.target.value })}
            />
          </Col>

          <Col span={24}>
            <span>Height:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="heightFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.heightFrom}
                  onChange={value => setState({ ...state, heightFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="heightTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.heightTo}
                  onChange={value => setState({ ...state, heightTo: value })}
                />
              </Col>
            </Row>

            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, heightFrom: value[0], heightTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Weight:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="weightFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.weightFrom}
                  onChange={value => setState({ ...state, weightFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="weightTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.weightTo}
                  onChange={value => setState({ ...state, weightTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, weightFrom: value[0], weightTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Health points:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="HPFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.HPFrom}
                  onChange={value => setState({ ...state, HPFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="HPTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.HPTo}
                  onChange={value => setState({ ...state, HPTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, HPFrom: value[0], HPTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Attack:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="attackFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.attackFrom}
                  onChange={value => setState({ ...state, attackFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="attackTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.attackTo}
                  onChange={value => setState({ ...state, attackTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, attackFrom: value[0], attackTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Defense:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="defenseFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.defenseFrom}
                  onChange={value => setState({ ...state, defenseFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="defenseTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.defenseTo}
                  onChange={value => setState({ ...state, defenseTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, defenseFrom: value[0], defenseTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Special Attack:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="specialAttackFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.specialAttackFrom}
                  onChange={value => setState({ ...state, specialAttackFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="specialAttackTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.specialAttackTo}
                  onChange={value => setState({ ...state, specialAttackTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, specialAttackFrom: value[0], specialAttackTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Special Defense:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="specialDefenseFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.specialDefenseFrom}
                  onChange={value => setState({ ...state, specialDefenseFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="specialDefenseTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.specialDefenseTo}
                  onChange={value => setState({ ...state, specialDefenseTo: value })}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, specialDefenseFrom: value[0], specialDefenseTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span>Speed:</span>
            <Row>
              <Col span={12}>
                <InputNumber
                  name="speedFrom"
                  placeholder="From"
                  min={0}
                  max={400}
                  value={state.speedFrom}
                  onChange={value => setState({ ...state, speedFrom: value })}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  name="speedTo"
                  placeholder="To"
                  min={0}
                  max={400}
                  value={state.speedTo}
                  onChange={(value => setState({ ...state, speedTo: value }))}
                />
              </Col>
            </Row>
            <Slider
              {...sliderConfig}
              onAfterChange={(value) => {
                setState({ ...state, speedFrom: value[0], speedTo: value[1] });
              }}
            />
          </Col>

          <Col span={24}>
            <span htmlFor="category">Category:</span>
            <Input
              name="category"
              placeholder="category"
              value={state.category}
              onChange={value => setState({ ...state, category: value.target.value })}
            />
          </Col>

          <Col span={24}>
            <label>Abilities:</label>
            <Select
              allowClear
              name="abilities"
              mode="multiple"
              placeholder="Storm"
              style={{ width: '100%' }}
              onChange={value => setState({ ...state, abilities: value }) }
            >
              <Select.Option key={'Storm'}>Storm</Select.Option>
              <Select.Option key={'Water'}>Water</Select.Option>
              <Select.Option key={'Air'}>Air</Select.Option>
            </Select>
          </Col>

          <Col span={24}>
            <Button block type="primary" size="large" htmlType="submit">
              Search
            </Button>
          </Col>

        </Row>
      </Form>

    </AntdDrawer>
  );
});

export default () => <Drawer store={store}/>;
