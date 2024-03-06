import React from 'react';
import { notification } from 'antd';

class Test extends React.Component {
  componentDidMount = async (): Promise<void> => {
    const payload = {
      features_heater_on_time: [0, 18, 5, 50],
      features_temp: [0, 18],
      features_heating_time: [19, 5, 50],
    };

    fetch(`http://localhost:5000/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Prediction Results:', data); // Log the data to console
        this.openNotificationWithIcon('info', data);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
        this.openNotificationWithIcon('error', { message: 'Failed to fetch', description: error.message });
      });
  };

  openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: 'Prediction Results',
      description: (
        <div>
          <p>Heater On Time Prediction: {data.heater_on_time_prediction}</p>
          <p>Target Temperature Prediction: {data.target_temperature_prediction}</p>
          <p>Heating Time Prediction: {data.heating_time_prediction}</p>
        </div>
      ),
      duration: 0, // set duration to 0 to make the notification stay until closed manually
    });
  };

  render(): React.ReactNode {
    return <></>;
  }
}

export default Test;
