import React from 'react'
import { Button } from 'antd'
import { LoadingOutlined, AudioOutlined } from '@ant-design/icons'

interface Props {
  buttonSize: number
}

interface State {
  recording: boolean
  mediaRecorder: MediaRecorder | null
  audioChunks: BlobPart[]
}

class Voice extends React.Component<Props, State> {
  state: Readonly<State> = {
    recording: false,
    mediaRecorder: null,
    audioChunks: []
  }

  startRecording = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (event): void => {
      this.setState((prevState) => ({
        audioChunks: [...prevState.audioChunks, event.data]
      }))
    }
    mediaRecorder.start()

    this.setState({ mediaRecorder, recording: true })
  }

  stopRecording = (): void => {
    const { mediaRecorder, audioChunks } = this.state
    if (!mediaRecorder) return

    mediaRecorder.stop()
    mediaRecorder.stream.getTracks().forEach((track) => track.stop())
    this.setState({ recording: false }, () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      this.sendAudioToServer(audioBlob)
      this.setState({ audioChunks: [] }) // Reset audio chunks after sending
    })
  }

  sendAudioToServer = async (audioBlob: Blob): Promise<void> => {
    const formData = new FormData()
    formData.append('audio', audioBlob)
    fetch('http://localhost:5000/audio', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Audio uploaded successfully:', data)
      })
      .catch((error) => {
        console.error('Error uploading audio:', error)
      })
  }

  changeRecordState = (): void => {
    const { recording } = this.state
    if (recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
  }

  render(): React.ReactNode {
    const { buttonSize } = this.props
    const { recording } = this.state
    return (
      <Button
        type="primary"
        shape="circle"
        onClick={this.changeRecordState}
        style={{ width: buttonSize, height: buttonSize }}
      >
        {recording ? (
          <LoadingOutlined style={{ fontSize: buttonSize * 0.4 }} />
        ) : (
          <AudioOutlined style={{ fontSize: buttonSize * 0.4 }} />
        )}
      </Button>
    )
  }
}

export default Voice
