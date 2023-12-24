import React from 'react'
import style from '@renderer/assets/actbar.module.less'
import { Button } from 'antd'

const LeftBtn: React.FC = (): React.ReactNode => <Button>Left</Button>

const RightBtn: React.FC = (): React.ReactNode => <Button>Right</Button>

export { LeftBtn, RightBtn }
