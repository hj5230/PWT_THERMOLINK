import React from 'react'
import { Card, Row, Button, List, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import style from '@renderer/assets/less/viewport.module.less'

const { Title, Paragraph } = Typography
const { Item } = List

interface Props {
  back: () => void
}

interface State {
  heaterOnTimePrediction?: number
  targetTemperaturePrediction?: number
  heatingTimePrediction?: number
  timeUntilHeaterOn?: string
  timeUntilHeating?: string
  error?: string
}

class Predict extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {} // Initial state is empty, will be populated with fetched data
  }

  componentDidMount = (): void => {
    this.fetchPredictionData()
  }

  fetchPredictionData = async (): Promise<void> => {
    const payload = {
      features_heater_on_time: [0, 18, 5, 50],
      features_temp: [0, 18],
      features_heating_time: [18, 5, 50]
    }
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      this.setState(
        {
          heaterOnTimePrediction: data.heater_on_time_prediction,
          targetTemperaturePrediction: data.target_temperature_prediction,
          heatingTimePrediction: data.heating_time_prediction
        },
        () => {
          // Calculate and update state with time until predictions after state has been updated with prediction data
          this.updateTimeUntilPredictions()
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Specify type any to capture error correctly
      this.setState({ error: error.message }) // Wrap error.message in an object
    }
  }

  updateTimeUntilPredictions = (): void => {
    const { heaterOnTimePrediction, heatingTimePrediction } = this.state
    if (heaterOnTimePrediction !== undefined) {
      this.setState({ timeUntilHeaterOn: this.calculateTimeUntil(heaterOnTimePrediction) })
    }
    if (heatingTimePrediction !== undefined) {
      this.setState({ timeUntilHeating: this.calculateTimeUntil(heatingTimePrediction) })
    }
  }

  calculateTimeUntil = (prediction: number): string => {
    const currentTime = new Date()
    const hours = Math.floor(prediction)
    const minutes = Math.round((prediction - hours) * 60)
    const predictionTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      hours,
      minutes
    )
    const diff = predictionTime.getTime() - currentTime.getTime()
    if (diff < 0) {
      return 'The expected start time has been reached.'
    } else {
      const remainingHours = Math.floor(diff / (1000 * 60 * 60))
      const remainingMinutes = Math.round((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `in ${remainingHours} hours and ${remainingMinutes} minutes`
    }
  }

  formatHeaterOnTime = (prediction: number): string => {
    const hours = Math.floor(prediction)
    const minutes = Math.round((prediction - hours) * 60)
    return `${hours} : ${minutes}`
  }

  formatPredictionTime = (prediction: number): string => {
    const hours = Math.floor(prediction)
    const minutes = Math.round((prediction - hours) * 60)
    return `${hours} hours ${minutes} minutes`
  }

  renderPredictionResults = (): React.ReactNode => {
    const { formatHeaterOnTime, formatPredictionTime } = this
    const {
      heaterOnTimePrediction,
      targetTemperaturePrediction,
      heatingTimePrediction,
      timeUntilHeaterOn,
      error
    } = this.state
    if (error) {
      return <Typography.Text type="danger">Error: {error}</Typography.Text>
    }
    const predictions = [
      {
        title: 'Heater On Time',
        value: heaterOnTimePrediction ? formatHeaterOnTime(heaterOnTimePrediction) : 'N/A'
      },
      {
        title: 'Target Temperature',
        value: targetTemperaturePrediction ? `${Math.round(targetTemperaturePrediction)} ℃` : 'N/A'
      },
      {
        title: 'Heating Time',
        value: heatingTimePrediction ? formatPredictionTime(heatingTimePrediction) : 'N/A'
      }
    ]
    return (
      <>
        <Title level={2}>Prediction Results</Title>
        <List
          itemLayout="horizontal"
          dataSource={predictions}
          renderItem={(item) => (
            <Item>
              <Item.Meta
                title={<span className={style.title}>{item.title}</span>}
                description={<span className={style.meta_item}>{item.value}</span>}
              />
            </Item>
          )}
        />
        {timeUntilHeaterOn && (
          <Paragraph>
            Time until heater turns on: <strong>{timeUntilHeaterOn}</strong>
          </Paragraph>
        )}
      </>
    )
  }

  render(): React.ReactNode {
    const { back } = this.props
    return (
      <Card>
        <Row justify="end">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<CloseOutlined style={{ fontSize: '25px' }} />}
            onClick={back}
          />
        </Row>
        {this.renderPredictionResults()}
      </Card>
    )
  }
}

export default Predict
