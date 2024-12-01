import React, { useEffect, useRef, useState } from 'react'
import JSMpegSocketIoSource from '../../util/JSMpegSocketIoSource'
import io from 'socket.io-client'
import { getToken } from '../../util/auth'

const VideoStream = ({ target, width, height }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const canvasRef = useRef(null)
  const videoPlayerRef = useRef(null)

  const token = getToken()

  useEffect(() => {
    const socket = io(`/video`, {
      auth: { token, room: target },
    })

    socket.on('connect', () => {
      videoPlayerRef.current = connectVideoCanvas(socket)
      socket.emit('start')
    })

    return () => {
      videoPlayerRef.current && videoPlayerRef.current.stop()
    }
  }, [])

  const onError = error => {
    videoPlayerRef.current && videoPlayerRef.current.destroy()
    setError(String(error))
  }

  const connectVideoCanvas = socket => {
    if (!canvasRef.current) {
      onError('No canvas available.')
      return null
    }

    return new window.JSMpeg.Player(null, {
      canvas: canvasRef.current,
      audio: false,
      onStalled: () => onError('Unable to connect to video.'),
      source: JSMpegSocketIoSource,
      socket,
      onConnected: () => setLoading(false)
    },)
  }

  return (
    <div className="m-videostream">
      <canvas
        className="m-videostream--canvas"
        ref={canvasRef}
        id={`video-stream-canvas-${target}`}
        width={width ? width : '640'}
        height={height ? height : '480'}
      >
        <p>
          Please use a browser that supports the Canvas Element, like
          <a href="http://www.google.com/chrome">Chrome</a>,
          <a href="http://www.mozilla.com/sfirefox/">Firefox</a>,
          <a href="http://www.apple.com/safari/">Safari</a> or Internet Explorer
          10
        </p>
      </canvas>
      {loading && <p style={{ position: "absolute", left: "20px", bottom: 0 }}>Loading stream from {target}...</p>}
      {error && <p className="m-videostream--error">{error}</p>}
    </div>
  )
}

export default VideoStream
