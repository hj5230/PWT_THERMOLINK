import React from 'react'
import Voice from './Voice'
// import { LeftBtn, RightBtn } from './Actbtns'
import { Row, Col, Button } from 'antd'
import style from '@renderer/assets/less/actbar.module.less'

interface Props {
  windowWidth: number
  windowHeight: number
}

class Actionbar extends React.Component<Props, object> {
  render(): React.ReactNode {
    return (
      <>
        <Row className={style.row_content}>
          <Col span={10}>
            <div style={{ width: 100, height: 100, backgroundColor: 'grey' }} />
            {/* <Button style={{}}></Button> */}
          </Col>
          <Col span={4} className={style.voice_col}>
            <Voice />
          </Col>
          <Col span={10} className={style.right_col}>
            <div style={{ width: 100, height: 100, backgroundColor: 'grey' }} />
          </Col>
        </Row>
      </>
    )
  }
}

export default Actionbar
