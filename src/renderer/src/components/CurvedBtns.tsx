import React from 'react'
import style from '@renderer/assets/actbar.module.less'
import { Button } from 'antd'

const LeftBtn: React.FC = (): React.ReactNode => {
  return <Button className={style.btn_left}>Left</Button>
}

const RightBtn: React.FC = (): React.ReactNode => {
  return <Button className={style.btn_right}>Right</Button>
}

export { LeftBtn, RightBtn }
