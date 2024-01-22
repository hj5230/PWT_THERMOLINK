import React from 'react'
import Navbar from './components/Navbar'
import Viewport from './components/Viewport'
import Actionbar from './components/Actionbar'

interface State {
  windowWidth: number
  windowHeight: number
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
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

  render(): React.ReactNode {
    const { windowWidth, windowHeight } = this.state
    return (
      <>
        <Navbar />
        <Viewport windowWidth={windowWidth} widgetHeight={windowHeight - 75} />
        <Actionbar windowWidth={windowWidth} widgetHeight={100} />
      </>
    )
  }
}

export default App
