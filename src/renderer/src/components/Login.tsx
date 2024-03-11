import React from 'react'
import { Modal, Input, Button, Badge } from 'antd'
import style from '@renderer/assets/less/login.module.less'

interface Props {
  isLoginOpen: boolean
  onClose: () => void
  setLoginUser: (e: string) => void
  loginUser: string | null
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

  componentDidMount = (): void => {
    const { onVerifyJwt } = this
    onVerifyJwt()
  }

  onVerifyJwt = async (): Promise<void> => {
    const { setLoginUser } = this.props
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(`http://localhost:5000/verify_jwt`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      const result = await response.json()
      if (result.username) {
        setLoginUser(result.username)
      }
    }
  }

  onVerifyInputs = (): void => {
    const { productId, username, email } = this.state
    const productIdValid = /^[0-9a-zA-Z]{16}$/.test(productId)
    const usernameValid = username.trim().length >= 6
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    this.setState({ inputsStatus: [productIdValid, usernameValid, emailValid] })
  }

  handleInputChange = (field: keyof State, value: string): void => {
    const { onVerifyInputs } = this
    this.setState({ [field]: value } as unknown as Pick<State, keyof State>)
    onVerifyInputs()
  }

  onSubmit = async (): Promise<void> => {
    const { onVerifyJwt } = this
    const { setLoginUser } = this.props
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
    if (result.msg || !result.jwt)
      this.setState({
        loginError: result.msg,
        loading: false
      })
    localStorage.setItem('jwt', result.jwt)
    this.setState({ loading: false }, () => {
      onVerifyJwt()
    })
    setLoginUser(username)
  }

  render(): React.ReactNode {
    const { onSubmit, onVerifyInputs } = this
    const { isLoginOpen, onClose, loginUser } = this.props
    const { inputsStatus, loading, productId, username, email, loginError } = this.state
    return (
      <Modal
        title="Login"
        open={isLoginOpen}
        onCancel={onClose}
        footer={
          <Button type="primary" loading={loading} onClick={onSubmit} disabled={!!loginUser}>
            Submit
          </Button>
        }
      >
        {loginUser ? (
          <>
            You have logged in as <big>{loginUser}</big>
          </>
        ) : (
          <>
            <Input
              className={style.field}
              placeholder="Product ID"
              status={inputsStatus[0] ? '' : 'error'}
              value={productId}
              onChange={(e) => this.handleInputChange('productId', e.target.value)}
              onMouseMove={onVerifyInputs}
            />
            <Input
              className={style.field}
              placeholder="Username"
              status={inputsStatus[1] ? '' : 'error'}
              value={username}
              onChange={(e) => this.handleInputChange('username', e.target.value)}
              onMouseMove={onVerifyInputs}
            />
            <Input
              className={style.field}
              placeholder="Email"
              status={inputsStatus[2] ? '' : 'error'}
              value={email}
              onChange={(e) => this.handleInputChange('email', e.target.value)}
              onMouseMove={onVerifyInputs}
            />
          </>
        )}
        {loginError ? <Badge color="red" text={loginError} /> : <></>}
      </Modal>
    )
  }
}

export default Login
