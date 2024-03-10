import React from 'react'
import { Row, Col, Button, Divider } from 'antd'
import { SettingOutlined, UserSwitchOutlined, CloseOutlined } from '@ant-design/icons'
import Login from './Login'
import Settings from './Settings'
import style from '@renderer/assets/less/navbar.module.less'

interface Props {
  setLoginUser: (e: string) => void
  loginUser: string | null
}

interface State {
  isLoginOpen: boolean
  isSettingsOpen: boolean
}

class Navbar extends React.Component<Props, State> {
  state: Readonly<State> = {
    isLoginOpen: false,
    isSettingsOpen: false
  }

  openLoginModal = (): void => {
    this.setState({ isLoginOpen: true })
  }

  closeLoginModal = (): void => {
    this.setState({ isLoginOpen: false })
  }

  openSettingsDrawer = (): void => {
    this.setState({ isSettingsOpen: true })
  }

  closeSettingsDrawer = (): void => {
    this.setState({ isSettingsOpen: false })
  }

  render(): React.ReactNode {
    const { openLoginModal, closeLoginModal, openSettingsDrawer, closeSettingsDrawer } = this
    const { setLoginUser, loginUser } = this.props
    const { isLoginOpen, isSettingsOpen } = this.state
    return (
      <>
        <Row className={style.row_content}>
          <Col span={8} className={style.settings_col}>
            <Button className={style.big_nav_btn} type="link" onClick={openSettingsDrawer}>
              <SettingOutlined style={{ fontSize: '30px' }} />
            </Button>
            <Settings isSettingsOpen={isSettingsOpen} closeSettings={closeSettingsDrawer} />
          </Col>
          <Col span={8} className={style.info_col}>
            some basic info...
          </Col>
          <Col span={8} className={style.user_col}>
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
          </Col>
        </Row>
        <Login
          isLoginOpen={isLoginOpen}
          onClose={closeLoginModal}
          setLoginUser={setLoginUser}
          loginUser={loginUser}
        />
        <Divider className={style.nav_divider} dashed />
      </>
    )
  }
}

export default Navbar
