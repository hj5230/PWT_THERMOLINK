import React from 'react'
import { Card, Row, Button } from 'antd' // Import Row instead of Flex
import { CloseOutlined } from '@ant-design/icons'

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

  renderPredictionResults = (): React.ReactNode => {
    const {
      heaterOnTimePrediction,
      targetTemperaturePrediction,
      heatingTimePrediction,
      timeUntilHeaterOn,
      error
    } = this.state
    if (error) {
      return <p>Error: {error}</p> // Access message property of error object
    }
    return (
      <div>
        <p>Heater On Time Prediction: {heaterOnTimePrediction} (HH.MM format)</p>
        <p>Target Temperature Prediction: {targetTemperaturePrediction} (min)</p>
        <p>Heating Time Prediction: {heatingTimePrediction} (HH.MM format)</p>
        <p>{timeUntilHeaterOn && `Time until heater turns on: ${timeUntilHeaterOn}`}</p>
      </div>
    )
  }

  render(): React.ReactNode {
    const { back } = this.props
    return (
      <Card>
        <Row justify="end">
          {' '}
          {/* Use Row with justify */}
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
