import React, { Component } from 'react'
import { API_URL } from '../pages/login'
import { getToken } from '../../util/auth'

class VideoStream extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoPlayer: undefined,
      error: '',
    }

    this.canvasIdentifier = `video-stream-vanvas${props.id}`
    this.videoURL = `ws://${window.location.host.split(':')[0]}/socket.io/${
      props.url
    }?EIO=3&transport=websocket`
    this.onError = this.onError.bind(this)
  }

  componentDidMount() {
    const token = getToken()

    fetch(`${API_URL}/access-token`, {
      headers: {
        Authorization: 'bearer ' + token,
      },
    })
      .then(response => {
        console.log('Got OK access-token for video.')
        if (!response.ok) {
          console.log('Failed to get video access token')
        } else {
          return response.text()
        }
      })
      .then(videoToken => {
        const videoPlayer = this.connectVideoCanvas(
          document.getElementById(this.canvasIdentifier),
          this.videoURL + '?access_token=' + videoToken,
          token,
          this.onError
        )
        this.setState({ videoPlayer })
      })
  }

  componentWillUnmount() {
    if (this.state.videoPlayer) {
      this.state.videoPlayer.stop()
    }
  }

  connectVideoCanvas(canvas, url, token, onError) {
    if (!canvas) onError('No canvas available.')
    return new window.JSMpeg.Player(url, {
      canvas,
      audio: false,
      onStalled: () => onError('Unable to connect to video.'),
    })
  }

  onError(error) {
    const { videoPlayer } = this.state

    if (videoPlayer) {
      videoPlayer.destroy()
    }

    this.setState({ error: String(error) })
  }

  render() {
    const { width, height } = this.props

    return (
      <div className="m-videostream">
        <canvas
          className="m-videostream--canvas"
          ref={this.canvasIdentifier}
          id={this.canvasIdentifier}
          width={width ? width : '640'}
          height={height ? height : '480'}
        >
          <p>
            Please use a browser that supports the Canvas Element, like
            <a href="http://www.google.com/chrome">Chrome</a>,
            <a href="http://www.mozilla.com/sfirefox/">Firefox</a>,
            <a href="http://www.apple.com/safari/">Safari</a> or Internet
            Explorer 10
          </p>
        </canvas>
        {this.state.error && (
          <p className="m-videostream--error">{this.state.error}</p>
        )}
      </div>
    )
  }
}

export default VideoStream
