import React from 'react'
import { ConfigProvider } from 'antd'
import Navbar from './components/Navbar'
import Viewport from './components/Viewport'
import Actionbar from './components/Actionbar'
import Popup from './components/Popup'

interface State {
  tickle: boolean
  windowWidth: number
  windowHeight: number
  loginUser: string | null
  view: number
}

class App extends React.Component<object, State> {
  state: State = {
    tickle: false,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    loginUser: null,
    view: 0
  }

  tickleFunc = (): void => {
    const { tickle } = this.state
    this.setState({ tickle: !tickle })
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

  setView = (e: number): void => {
    this.setState({ view: e })
  }

  render(): React.ReactNode {
    const { tickleFunc, setLoginUser, setView } = this
    const { tickle, windowWidth, windowHeight, loginUser, view } = this.state
    return (
      <ConfigProvider theme={{}}>
        <Navbar setLoginUser={setLoginUser} loginUser={loginUser} />
        <Viewport
          tickle={tickleFunc}
          windowWidth={windowWidth}
          widgetHeight={windowHeight - 75}
          view={view}
          setView={setView}
        />
        <Actionbar windowWidth={windowWidth} widgetHeight={100} setView={setView} />
        <Popup tickle={tickle} />
      </ConfigProvider>
    )
  }
}

export default App
