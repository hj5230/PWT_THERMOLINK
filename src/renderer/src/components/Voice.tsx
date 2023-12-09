import React from 'react'
import { Button } from 'antd'
import style from '@renderer/assets/actbar.module.less'

class Voice extends React.Component {
  render(): React.ReactNode {
    return (
      <Button className={style.btn_round_bg}>
        语音
      </Button>
    )
  }
}

export default Voice
