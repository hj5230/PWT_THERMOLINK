import React from 'react'
import Heater from './Heater'
import Control from './Control'

interface Props {
  windowWidth: number
  widgetHeight: number
  view: number
}

class Viewport extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { windowWidth, widgetHeight, view } = this.props
    return (
      <div style={{ height: widgetHeight }}>
        {view === 0 && <Heater windowWidth={windowWidth - 16} widgetHeight={widgetHeight} />}
        {view === 1 && <Control />}
        {view === 2 && <div />}
      </div>
    )
  }
}

export default Viewport
