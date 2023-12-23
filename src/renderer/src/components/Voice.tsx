import React from 'react'
import { Button } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import style from '@renderer/assets/actbar.module.less'

class Voice extends React.Component {
  render(): React.ReactNode {
    return (
      <Button className={style.btn_round_bg}>
        <AudioOutlined style={{ fontSize: 50 }} />
      </Button>
    )
  }
}

export default Voice
