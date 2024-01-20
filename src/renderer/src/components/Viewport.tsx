import React from 'react'
import Heater from './Heater'

class Viewport extends React.Component {
  render(): React.ReactNode {
    return (
      <div style={{ height: '55vh' }}>
        <Heater />
      </div>
    )
  }
}

export default Viewport
