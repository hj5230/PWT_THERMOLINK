import React from 'react'
import type { MenuProps } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { Avatar, Button, Col, Drawer, Menu, Rate, Row, Segmented } from 'antd'
import CHN from '@renderer/assets/cn.png'
import GBR from '@renderer/assets/gb.png'
import FIN from '@renderer/assets/fi.png'

type MenuItem = Required<MenuProps>['items'][number]

const toMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type
})

const rootKeys = ['lang', 'cuse']

const langOpts = [
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar src={CHN} />
      </div>
    ),
    value: 'en'
  },
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar src={GBR} />
      </div>
    ),
    value: 'zh'
  },
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar src={FIN} />
      </div>
    ),
    value: 'fi'
  }
]

const items: MenuProps['items'] = [
  toMenuItem('Language', 'lang', null, [
    toMenuItem(
      // <Segmented options={['中文', 'English', 'Suomi']} defaultValue={'English'} />,
      <Segmented options={langOpts} defaultValue={'English'} />,
      'langopts'
    )
  ]),
  toMenuItem('Customer Service', 'custserv', null, [
    toMenuItem(
      <Button size="small" type="link">
        Email
      </Button>,
      'email'
    ),
    toMenuItem(
      <Button size="small" type="link">
        Phone
      </Button>,
      'phone'
    )
  ]),
  toMenuItem('Grade the App', 'rate', null, [
    toMenuItem(
      <Row>
        <Col span={16}>
          <Rate allowHalf defaultValue={5} />
        </Col>
        <Col span={8}>
          <Button size="small">Submit</Button>
        </Col>
      </Row>,
      'star'
    )
  ])
]

interface Props {
  isSettingsOpen: boolean
  closeSettings: () => void
}

interface State {
  lang: string
  openKeys: string[]
}

class Settings extends React.Component<Props, State> {
  state: Readonly<State> = {
    lang: 'en',
    openKeys: []
  }

  onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const { openKeys } = this.state
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootKeys.indexOf(latestOpenKey!) === -1) {
      this.setState({ openKeys: keys })
    } else {
      this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] })
    }
  }

  onClickMenuItem = (e: MenuInfo): void => {
    console.log(e, e.key)
  }

  render(): React.ReactNode {
    const { onOpenChange, onClickMenuItem } = this
    const { isSettingsOpen, closeSettings } = this.props
    const { openKeys } = this.state
    return (
      <>
        <Drawer title="Settings" placement="left" open={isSettingsOpen} onClose={closeSettings}>
          <Menu
            mode="inline"
            items={items}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClickMenuItem}
          />
        </Drawer>
      </>
    )
  }
}

export default Settings
