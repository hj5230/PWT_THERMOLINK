import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import { SettingOutlined, UserSwitchOutlined, CloseOutlined } from '@ant-design/icons'
import Login from './Login'
import style from '@renderer/assets/navbar.module.less'

interface State {
  isLoginOpen: boolean
}

class Navbar extends React.Component<object, State> {
  state: Readonly<State> = {
    isLoginOpen: false
  }

  openLoginModal = (): void => {
    this.setState({ isLoginOpen: true })
  }

  closeLoginModal = (): void => {
    this.setState({ isLoginOpen: false })
  }

  userPopover = (
    <>
      <Row>
        <Button className={style.full_button}>Button</Button>
      </Row>
    </>
  )

  render(): React.ReactNode {
    const { userPopover, openLoginModal } = this
    const { isLoginOpen } = this.state
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
              <Button
                className={style.big_nav_btn}
                type="primary"
                shape="circle"
                onClick={openLoginModal}
              >
                {isLoginOpen ? (
                  <CloseOutlined style={{ fontSize: '30px' }} />
                ) : (
                  <UserSwitchOutlined style={{ fontSize: '25px' }} />
                )}
              </Button>
            </Popover>
          </Col>
        </Row>
        <Divider className={style.nav_divider} dashed />
        <Login isLoginOpen={isLoginOpen} onClose={this.closeLoginModal} />
      </>
    )
  }
}

export default Navbar
