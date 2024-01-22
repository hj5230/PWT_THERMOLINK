import React from 'react'
import Heater from './Heater'

interface Props {
  windowWidth: number
  widgetHeight: number
}

class Viewport extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { windowWidth, widgetHeight } = this.props
    return (
      <div style={{ height: widgetHeight }}>
        {/* three model width to be fixed */}
        <Heater windowWidth={windowWidth - 16} widgetHeight={widgetHeight} />
      </div>
    )
  }
}

export default Viewport
