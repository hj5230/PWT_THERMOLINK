import React from 'react'
import { Card, Flex, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
  back: () => void
}

class Predict extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { back } = this.props
    return (
      <Card>
        <Flex justify="flex-end">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<CloseOutlined style={{ fontSize: '25px' }} />}
            onClick={back}
          />
        </Flex>
      </Card>
    )
  }
}

export default Predict
