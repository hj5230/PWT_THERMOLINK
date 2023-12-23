import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import { SettingOutlined, UserSwitchOutlined } from '@ant-design/icons'
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
        <Row className={style.row_content}>
          <Col span={8} className={style.settings_col}>
            <Button className={style.big_nav_btn} type="link">
              <SettingOutlined style={{ fontSize: '30px' }} />
            </Button>
          </Col>
          <Col span={8} className={style.info_col}>
            some basic info...
          </Col>
          <Col span={8} className={style.user_col}>
            <Popover content={userPopover}>
              <Button className={style.big_nav_btn} type="primary" shape="circle">
                <UserSwitchOutlined style={{ fontSize: '25px' }} />
              </Button>
            </Popover>
          </Col>
        </Row>
        <Divider className={style.nav_divider} dashed />
      </>
    )
  }
}

export default Navbar
