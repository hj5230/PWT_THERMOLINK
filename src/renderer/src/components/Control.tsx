import React from 'react'
import { Card, Row, Col, Select, Switch, Slider, TimePicker } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const { Option } = Select

class Control extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Card>
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
                placeholder="Select Startup Time"
                suffixIcon={<ClockCircleOutlined />}
              />
              <TimePicker
                format="HH:mm"
                placeholder="Select Shutdown Time"
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
