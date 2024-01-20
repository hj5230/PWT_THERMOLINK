import React from 'react'
import Voice from './Voice'
import { Row, Col, Button, Flex } from 'antd'
// import style from '@renderer/assets/less/actbar.module.less'

interface Props {
  windowWidth: number
  windowHeight: number
}

class Actionbar extends React.Component<Props, object> {
  componentDidUpdate = (): void => {
    // console.log(this.props.windowWidth)
  }

  getVoiceBtnSize = (): number => {
    const { windowWidth } = this.props
    return (windowWidth - 16) / 6
  }

  render(): React.ReactNode {
    const { getVoiceBtnSize } = this
    return (
      <>
        <Row>
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
