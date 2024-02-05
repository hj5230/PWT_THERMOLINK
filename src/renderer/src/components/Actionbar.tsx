import React from 'react'
import Voice from './Voice'
import { Row, Col, Button, Flex } from 'antd'
import { AreaChartOutlined, ControlOutlined } from '@ant-design/icons'

interface Props {
  windowWidth: number
  widgetHeight: number
}

interface State {
  generalizedSize: number
}

class Actionbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      generalizedSize: this.getGeneralizedSize()
    }
  }

  getGeneralizedSize = (): number => {
    const { windowWidth } = this.props
    return (windowWidth - 16) / 6
  }

  render(): React.ReactNode {
    const { windowWidth } = this.props
    const { generalizedSize } = this.state
    return (
      <>
        <Row
          style={{
            position: 'fixed',
            bottom: '8px',
            width: windowWidth - 16,
            zIndex: 1
          }}
        >
          <Col span={10}>
            <Flex justify="flex-start" align="flex-end" style={{ height: generalizedSize }}>
              <Button type="primary" style={{ width: '100%', height: '50%' }}>
                <AreaChartOutlined style={{ fontSize: 32 }} />
              </Button>
            </Flex>
          </Col>
          <Col span={4}>
            <Flex justify="center" align="center">
              <Voice buttonSize={generalizedSize} />
            </Flex>
          </Col>
          <Col span={10}>
            <Flex justify="flex-end" align="flex-end" style={{ height: generalizedSize }}>
              <Button type="primary" style={{ width: '100%', height: '50%' }}>
                <ControlOutlined style={{ fontSize: 32 }} />
              </Button>
            </Flex>
          </Col>
        </Row>
      </>
    )
  }
}

export default Actionbar
