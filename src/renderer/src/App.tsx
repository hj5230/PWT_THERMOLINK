import React from 'react'
import Navbar from './components/Navbar'
import Viewport from './components/Viewport'
import Actionbar from './components/Actionbar'
import Test from './components/Test'

interface State {
  windowWidth: number
  windowHeight: number
  loginUser: string | null
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    loginUser: null
  }

  updateWidth = (): void => {
    this.setState({ windowWidth: window.innerWidth })
  }

  updateHeight = (): void => {
    this.setState({ windowHeight: window.innerHeight })
  }

  componentDidMount = (): void => {
    const { updateWidth, updateHeight } = this
    window.addEventListener('resize', updateWidth)
    window.addEventListener('resize', updateHeight)
  }

  componentWillUnmount = (): void => {
    const { updateWidth, updateHeight } = this
    window.removeEventListener('resize', updateWidth)
    window.removeEventListener('resize', updateHeight)
  }

  setLoginUser = (e: string): void => {
    this.setState({ loginUser: e })
  }

  render(): React.ReactNode {
    const { setLoginUser } = this
    const { windowWidth, windowHeight, loginUser } = this.state
    return (
      <>
        <Navbar setLoginUser={setLoginUser} loginUser={loginUser} />
        <Viewport windowWidth={windowWidth} widgetHeight={windowHeight - 75} />
        <Actionbar windowWidth={windowWidth} widgetHeight={100} />
        <Test />
      </>
    )
  }
}

export default App
