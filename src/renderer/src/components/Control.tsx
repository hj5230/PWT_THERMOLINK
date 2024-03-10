import React from 'react'
import { Card, Row, Col, Select, Switch, Slider, TimePicker, Button, Flex } from 'antd'
import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select

interface Props {
  back: () => void
}

class Control extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { back } = this.props
    return (
      <>
        <Card>
          <Flex justify="flex-end">
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<CloseOutlined style={{ fontSize: '25px' }} />}
              onClick={back}
            />
          </Flex>
          <Row>
            <Col span={10}>Power</Col>
            <Col span={2} />
            <Col span={20}>
              <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <p>Mode</p>
              <Select style={{ width: '100%' }}>
                <Option value="eco">Eco</Option>
                <Option value="comfort">Comfort</Option>
                <Option value="antiFreeze">Anti-freeze</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <p>Temperature</p>
              <Slider min={10} max={30} marks={{ 10: '10°C', 30: '30°C' }} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <p>Schedule</p>
              <TimePicker
                format="HH:mm"
                placeholder="Startup Time"
                suffixIcon={<ClockCircleOutlined />}
              />
              <TimePicker
                format="HH:mm"
                placeholder="Shutdown Time"
                suffixIcon={<ClockCircleOutlined />}
              />
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default Control
