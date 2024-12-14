import React, { Component, useEffect, useState } from 'react'
import { checkLogin, logout } from '../../../util/auth'
import { getToken } from '../../../util/auth'
import { connectIO } from './socket.js'
import { handleKeyDown, handleKeyUp } from './keyControl'
import CtrlButton from './ctrlButton'
import * as actions from './robotPiActionTypes'

import './style.css'
import VideoStream from '../../molecules/videoStream'
import CameraControl from './CameraControl'
import VideoStreamRTC from '../../molecules/videoStreamRTC.js'

export default function CatHunter(props) {
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const [powerSelectCommand, setPowerSelectCommand] = useState("")
  const [status, setStatus] = useState({})
  const [inputs, setInputs] = useState({
    up: false,
    left: false,
    down: false,
    right: false,
    cameraUp: false,
    cameraDown: false,
  })
  const [error, setError] = useState("")
  const [startedData, setStartedData] = useState({})
  const [connectingSeconds, setConnectingSeconds] = useState(0)


  const controller = {
    perform: action => socket.emit(action),
    forward: () => socket.emit(types.FORWARD),
    backward: () => socket.emit(types.BACKWARD),
    left: () => socket.emit(types.LEFT),
    right: () => socket.emit(types.RIGHT),
    rotLeft: () => socket.emit(types.ROTATE_LEFT),
    rotRight: () => socket.emit(types.ROTATE_RIGHT),
    reverse: () => socket.emit(types.REVERSE),
    stop: () => socket.emit(types.STOP),
    setPowerLow: () => socket.emit(types.SET_POWER_LOW),
    setPowerMediumLow: () => socket.emit(types.SET_POWER_MEDIUM_LOW),
    setPowerMedium: () => socket.emit(types.SET_POWER_MEDIUM),
    setPowerHigh: () => socket.emit(types.SET_POWER_HIGH),
    cameraUp: () => socket.emit(types.TILT_CAMERA_UP),
    cameraDown: () => socket.emit(types.TILT_CAMERA_DOWN),
    cameraRelease: () => socket.emit(types.TILT_CAMERA_STOP),
  }

  function setupStatusInterval(socket) {
    socket.on('status', status => {
      if (status) {
        setStatus(JSON.parse(status))
        setLoading(false)
      }
      setTimeout(() => socket.emit('status'), 500)
    })
    socket.emit('status')
  }

  function onKeyDown(event) {
    handleKeyDown(event, action => socket.emit(action), inputs, setInputs)
  }

  function onKeyUp(event) {
    handleKeyUp(event, action => socket.emit(action), inputs, setInputs)
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => setConnectingSeconds(connectingSeconds + 1), 1000)
    } else {
      setConnectingSeconds(0)
    }
  }, [connectingSeconds])

  useEffect(() => {
    checkLogin().then(isLoggedIn => {
      if (!isLoggedIn) {
        logout()
      }
    })

    const token = getToken()

    connectIO(token, error => setError(String(error)))
      .then(({ socket }) => {
        setSocket(socket)
        setupStatusInterval(socket)
      })
      .catch(error => setError(String(error)))

    setLoading(true)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)

      if (socket) socket.close()
    }
  }, [])



  function renderPowerSelection() {
    return (
      <div>
        <label for="power">Set power mode: </label>
        <select
          name="power"
          id="power"
          value={powerSelectCommand}
          onChange={e => {
            const command = e.target.value
            setPowerSelectCommand(command)
            if (command !== '') {
              socket.emit(command)
            }
          }}
        >
          <option value="">--Select power--</option>
          <option value={actions.SET_POWER_LOW}>Low</option>
          <option value={actions.SET_POWER_MEDIUM_LOW}>Mediun low</option>
          <option value={actions.SET_POWER_MEDIUM}>Medium</option>
          <option value={actions.SET_POWER_HIGH}>High</option>
        </select>
      </div>
    )
  }

  function renderStatus(status) {
    if (Object.keys(status).length === 0) {
      return <p>Waiting for CatHunter status...</p>
    }

    return <div>{
      Object.keys(status).map(statusKey =>
        <p><b>{statusKey.charAt(0).toUpperCase() + statusKey.substring(1).replace(/_/g, " ")}</b> {status[statusKey]}</p>)
    }
    </div>
  }

  const {
    started,
    lastConnected,
  } = startedData
  const { up, left, down, right, cameraUp, cameraDown } = inputs

  return (
    <div className="p-cathunter">
      <h1>CatHunter 3.0</h1>
      <VideoStreamRTC width={640} height={480} source={"catero_huntero_3.0"} token={token} />
      {loading && <p>Connecting to CatHunter... {connectingSeconds}s</p>}
      {!loading && <><div className="buttons">
        <CtrlButton action={actions.LEFT} controller={controller} />
        <CtrlButton
          action={actions.FORWARD}
          active={up}
          controller={controller}
        />
        <CtrlButton action={actions.RIGHT} controller={controller} />
        <br />
        <CtrlButton
          action={actions.ROTATE_LEFT}
          active={left}
          controller={controller}
        />
        <CtrlButton
          action={actions.BACKWARD}
          active={down}
          controller={controller}
        />
        <CtrlButton
          action={actions.ROTATE_RIGHT}
          active={right}
          controller={controller}
        />
      </div>
        <CameraControl
          controller={controller}
          up={cameraUp}
          down={cameraDown}
        />
        {renderPowerSelection()}
        {started && <p>CatHunter last started {started}.</p>}
        {lastConnected && <p>Last user disconnected {lastConnected}.</p>}
      </>}
      {error && <p className="disconnected">{error}</p>}
      {renderStatus(status)}
    </div>
  )

}
