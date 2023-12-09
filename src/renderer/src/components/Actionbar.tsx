import React from 'react'
import Voice from './Voice'
// import { LeftBtn, RightBtn } from './CurvedBtns'
import { Row, Col } from 'antd'
import style from '@renderer/assets/actbar.module.less'

interface Props {
  windowWidth: number
  windowHeight: number
}

class Actionbar extends React.Component<Props, object> {
  render(): React.ReactNode {
    return (
      <>
        <Row className={style.act_row}>
          <Col span={10}>{/* <LeftBtn /> */}</Col>
          <Col className={style.voice_col} span={4}>
            <Voice />
          </Col>
          <Col span={10}>{/* <RightBtn /> */}</Col>
        </Row>
      </>
    )
  }
}

export default Actionbar
