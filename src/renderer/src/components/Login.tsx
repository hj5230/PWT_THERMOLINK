import { Button, Modal } from 'antd'
import React from 'react'

interface Props {
  isLoginOpen: boolean
  onClose: () => void
}

class Login extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { isLoginOpen, onClose } = this.props
    return (
      <Modal
        title="Login"
        okText="Continue"
        open={isLoginOpen}
        onCancel={onClose}
      >
        <Button>submit</Button>
      </Modal>
    )
  }
}

export default Login
