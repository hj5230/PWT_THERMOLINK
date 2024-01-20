import React from 'react'
import { Button } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
// import style from '@renderer/assets/less/actbar.module.less'

interface Props {
  buttonSize: number
}

class Voice extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { buttonSize } = this.props
    return (
      <Button type="primary" shape="circle" style={{ width: buttonSize, height: buttonSize }}>
        <AudioOutlined style={{ fontSize: buttonSize * 0.4 }} />
      </Button>
    )
  }
}

export default Voice
