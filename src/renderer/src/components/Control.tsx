import React from 'react'
import {
  Card,
  Flex,
  Row,
  Col,
  Select,
  Switch,
  Slider,
  TimePicker,
  Button,
  Tag,
  InputNumber
} from 'antd'
import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons'
import style from '@renderer/assets/less/viewport.module.less'

const { Option } = Select

interface Props {
  back: () => void
}

interface State {
  value: number[]
}

class Control extends React.Component<Props, State> {
  state: State = {
    value: [10, 20]
  }

  getGradientColor = (percentage: number): string => {
    const startColor = [135, 208, 104] // Green-ish
    const endColor = [255, 204, 199] // Red-ish
    const midColor = startColor.map((start, i) => {
      const end = endColor[i]
      const delta = end - start
      return Math.round(start + delta * percentage).toString()
    })

    return `rgb(${midColor.join(',')})`
  }

  setValue = (e: number[]): void => {
    this.setState({ value: e })
  }

  setTemp = (e: number | null): void => {
    const { value } = this.state
    if (!e) return
    value[1] = e
    this.setState({ value: value })
  }

  render(): React.ReactNode {
    const { getGradientColor, setValue, setTemp } = this
    const { back } = this.props
    const { value } = this.state
    const start = value[0] / 100
    const end = value[value.length - 1] / 100
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
          <Row className={style.row}>
            <Tag color="cyan">Smart Control Mode</Tag>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Row>
          <Row className={style.row}>
            <Tag color="red">Power</Tag>
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Row>
          <Row>
            <Col span={11}>
              <Tag className={style.row} color="green">
                Mode
              </Tag>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Tag className={style.row} color="geekblue">
                Schedule
              </Tag>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Select style={{ width: '100%' }} placeholder="mode">
                <Option value="eco">Eco</Option>
                <Option value="comfort">Comfort</Option>
                <Option value="antiFreeze">Anti-freeze</Option>
              </Select>
            </Col>
            <Col span={2} />
            <Col span={11}>
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
              <Button type="primary">Update</Button>
            </Col>
          </Row>
          <Tag className={style.row} color="gold">
            Temperature
          </Tag>
          <Row>
            <Col span={20}>
              <Slider
                range
                min={10}
                max={25}
                defaultValue={value}
                onChange={setValue}
                styles={{
                  track: {
                    background: 'transparent'
                  },
                  rail: {
                    background: `linear-gradient(to right, ${getGradientColor(
                      start
                    )} 0%, ${getGradientColor(end / 0.3)} 100%)`
                  }
                }}
              />
            </Col>
            <Col span={4}>
              <InputNumber value={value[1]} onChange={setTemp}></InputNumber>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default Control
