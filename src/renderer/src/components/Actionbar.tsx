import React from 'react'
import Voice from './Voice'
import { Row, Col, Button, Flex } from 'antd'

interface Props {
  windowWidth: number
  widgetHeight: number
}

class Actionbar extends React.Component<Props, object> {
  getVoiceBtnSize = (): number => {
    const { windowWidth } = this.props
    return (windowWidth - 16) / 6
  }

  render(): React.ReactNode {
    const { getVoiceBtnSize } = this
    const { windowWidth } = this.props
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
            <Flex justify="flex-start" align="flex-end" style={{ height: getVoiceBtnSize() }}>
              <Button type="primary" style={{ width: '100%', height: '50%' }}></Button>
            </Flex>
          </Col>
          <Col span={4}>
            <Flex justify="center" align="center">
              <Voice buttonSize={getVoiceBtnSize()} />
            </Flex>
          </Col>
          <Col span={10}>
            <Flex justify="flex-end" align="flex-end" style={{ height: getVoiceBtnSize() }}>
              <Button type="primary" style={{ width: '100%', height: '50%' }}></Button>
            </Flex>
          </Col>
        </Row>
      </>
    )
  }
}

export default Actionbar
