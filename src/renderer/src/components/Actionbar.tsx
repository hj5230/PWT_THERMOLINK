import React from 'react'
import Voice from './Voice'
import { Row, Col, Button, Flex } from 'antd'
import { ControlOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import style from '@renderer/assets/less/actbar.module.less'

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
    const { getGeneralizedSize } = this
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
            <Flex justify="flex-start" align="flex-end" style={{ height: getGeneralizedSize() }}>
              <Button
                type="primary"
                className={style.left_button}
                style={{ width: '100%', height: '50%' }}
              >
                <ControlOutlined style={{ fontSize: 32 }} />
              </Button>
            </Flex>
          </Col>
          <Col span={4}>
            <Flex justify="center" align="center">
              <Voice buttonSize={getGeneralizedSize()} />
            </Flex>
          </Col>
          <Col span={10}>
            <Flex justify="flex-end" align="flex-end" style={{ height: getGeneralizedSize() }}>
              <Button
                type="primary"
                className={style.right_button}
                style={{ width: '100%', height: '50%' }}
              >
                <FundProjectionScreenOutlined style={{ fontSize: 32 }} />
              </Button>
            </Flex>
          </Col>
        </Row>
      </>
    )
  }
}

export default Actionbar
