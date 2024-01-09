import React from 'react'
import { Drawer } from 'antd'

interface Props {
  isSettingsOpen: boolean
  closeSettings: () => void
}

class Settings extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { isSettingsOpen, closeSettings } = this.props
    return (
      <>
        <Drawer
          title="Settings"
          placement="left"
          open={isSettingsOpen}
          onClose={closeSettings}
        ></Drawer>
      </>
    )
  }
}

export default Settings
