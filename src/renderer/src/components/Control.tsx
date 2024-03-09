import React from 'react'
import { Space, Switch } from 'antd'

class Control extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Space direction="vertical">
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </Space>
      </>
    )
  }
}

export default Control
