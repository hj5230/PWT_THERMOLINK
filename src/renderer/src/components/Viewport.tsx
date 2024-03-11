import React from 'react'
import Heater from './Heater'
import Control from './Control'
import Predict from './Predict'

interface Props {
  tickle: () => void
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
    const { tickle, windowWidth, widgetHeight, view } = this.props
    return (
      <div style={{ height: widgetHeight }}>
        {view === 0 && <Heater windowWidth={windowWidth - 16} widgetHeight={widgetHeight} />}
        {view === 1 && <Control back={changeViewToDefault} tickle={tickle} />}
        {view === 2 && <Predict back={changeViewToDefault} />}
      </div>
    )
  }
}

export default Viewport
