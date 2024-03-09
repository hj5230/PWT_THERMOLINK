import React from 'react'
import Heater from './Heater'
import Control from './Control'

interface Props {
  windowWidth: number
  widgetHeight: number
  view: number
  setView: (e: number) => void
}

class Viewport extends React.Component<Props, object> {
  changeViewToDefault = (): void => {
    const { setView } = this.props
    setView(0)
  }

  render(): React.ReactNode {
    const { changeViewToDefault } = this
    const { windowWidth, widgetHeight, view } = this.props
    return (
      <div style={{ height: widgetHeight }}>
        {view === 0 && <Heater windowWidth={windowWidth - 16} widgetHeight={widgetHeight} />}
        {view === 1 && <Control back={changeViewToDefault} />}
        {view === 2 && <div />}
      </div>
    )
  }
}

export default Viewport
