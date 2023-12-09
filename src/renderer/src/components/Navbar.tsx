import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import style from '@renderer/assets/navbar.module.less'

class Navbar extends React.Component {
  userPopover = (
    <>
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
            <Button className={style.row_content}>
              <SettingOutlined />
            </Button>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            some basic info...
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Popover content={userPopover}>
              <Button className={style.row_content}>
                <UserOutlined />
              </Button>
            </Popover>
          </Col>
          <Divider className={style.nav_divider} />
        </Row>
      </>
    )
  }
}

export default Navbar
