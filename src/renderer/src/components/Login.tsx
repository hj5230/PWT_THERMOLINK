import React from 'react'
import { Modal, Input, Button } from 'antd'
import style from '@renderer/assets/less/login.module.less'

interface Props {
  isLoginOpen: boolean
  onClose: () => void
}

interface State {
  inputsStatus: boolean[]
  loading: boolean
}

class Login extends React.Component<Props, State> {
  state: Readonly<State> = {
    inputsStatus: [true, true, true],
    loading: false
  }

  onSubmit = (): void => {
    this.setState({ loading: true })
  }

  render(): React.ReactNode {
    const { onSubmit } = this
    const { isLoginOpen, onClose } = this.props
    const { inputsStatus, loading } = this.state
    return (
      <Modal
        title="Login"
        open={isLoginOpen}
        onCancel={onClose}
        footer={
          <Button type="primary" loading={loading} onClick={onSubmit}>
            Submit
          </Button>
        }
      >
        <Input
          className={style.field}
          placeholder="Product ID"
          status={inputsStatus[0] ? '' : 'error'}
        />
        <Input
          className={style.field}
          placeholder="Username"
          status={inputsStatus[1] ? '' : 'error'}
        />
        <Input
          className={style.field}
          placeholder="Password"
          status={inputsStatus[2] ? '' : 'error'}
        />
      </Modal>
    )
  }
}

export default Login
