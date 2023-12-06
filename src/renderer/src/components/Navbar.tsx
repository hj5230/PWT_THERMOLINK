import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import style from '@renderer/assets/index.module.less'

class Navbar extends React.Component {
  userPopover = (
    <>
      <Row>
        <Button className={style.full_button} type="text">
          设 置
        </Button>
      </Row>
      <Row>
        <Button className={style.full_button} type="text">
          服务器
        </Button>
      </Row>
      <Row>
        <Button className={style.full_button} type="text">
          退 出
        </Button>
      </Row>
    </>
  )

  render(): React.ReactNode {
    const { userPopover } = this
    return (
      <>
        <Row>
          <Col span={8} style={{ textAlign: 'start' }}>
            <Button className={style.row_content} type="text">
              本地目录
            </Button>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Divider />
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Popover content={userPopover}>
              <Button className={style.row_content} type="link">
                登陆
              </Button>
            </Popover>
            <Divider />
          </Col>
          <Divider className={style.nav_divider} />
        </Row>
      </>
    )
  }
}

export default Navbar
