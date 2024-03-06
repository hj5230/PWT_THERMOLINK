import React from 'react'
import { Modal, Input, Button } from 'antd'
import style from '@renderer/assets/less/login.module.less'

interface Props {
  isLoginOpen: boolean
  onClose: () => void
}

interface State {
  loginError: string | null
  inputsStatus: boolean[]
  loading: boolean
  productId: string
  username: string
  email: string
}

class Login extends React.Component<Props, State> {
  state: Readonly<State> = {
    loginError: null,
    inputsStatus: [true, true, true],
    loading: false,
    productId: '',
    username: '',
    email: ''
  }

  handleInputChange = (field: keyof State, value: string): void => {
    this.setState({ [field]: value } as unknown as Pick<State, keyof State>)
  }

  onSubmit = async (): Promise<void> => {
    const { productId, username, email } = this.state
    this.setState({ loading: true })
    const response = await fetch(`http://localhost:5000/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId,
        username,
        email
      })
    })
    const result = await response.json()
    if (result.msg || !result.jwt) this.setState({ loginError: result.msg })
    localStorage.setItem('jwt', result.jwt)
  }

  render(): React.ReactNode {
    const { onSubmit } = this
    const { isLoginOpen, onClose } = this.props
    const { inputsStatus, loading, productId, username, email } = this.state
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
          value={productId}
          onChange={(e) => this.handleInputChange('productId', e.target.value)}
        />
        <Input
          className={style.field}
          placeholder="Username"
          status={inputsStatus[1] ? '' : 'error'}
          value={username}
          onChange={(e) => this.handleInputChange('username', e.target.value)}
        />
        <Input
          className={style.field}
          placeholder="Email"
          status={inputsStatus[2] ? '' : 'error'}
          value={email}
          onChange={(e) => this.handleInputChange('email', e.target.value)}
        />
      </Modal>
    )
  }
}

export default Login
