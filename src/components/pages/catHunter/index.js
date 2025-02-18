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
import styled from 'styled-components'

export default function CatHunter(props) {
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
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
  const [token, setToken] = useState(null)


  const controller = {
    perform: action => socket.emit(action),
    forward: () => socket.emit(actions.FORWARD),
    backward: () => socket.emit(actions.BACKWARD),
    left: () => socket.emit(actions.LEFT),
    right: () => socket.emit(actions.RIGHT),
    rotLeft: () => socket.emit(actions.ROTATE_LEFT),
    rotRight: () => socket.emit(actions.ROTATE_RIGHT),
    stop: () => socket.emit(actions.STOP),
    setPowerLow: () => socket.emit(actions.SET_POWER_LOW),
    setPowerMediumLow: () => socket.emit(actions.SET_POWER_MEDIUM_LOW),
    setPowerMedium: () => socket.emit(actions.SET_POWER_MEDIUM),
    setPowerHigh: () => socket.emit(actions.SET_POWER_HIGH),
    cameraUp: () => socket.emit(actions.TILT_CAMERA_UP),
    cameraDown: () => socket.emit(actions.TILT_CAMERA_DOWN),
    cameraRelease: () => socket.emit(actions.TILT_CAMERA_STOP),
  }

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on('status', status => {
      if (status) {
        setStatus(JSON.parse(status))
        setLoading(false)
      }
    })

    const onKeyDown = event => handleKeyDown(event, action => socket.emit(action), inputs, setInputs)
    const onKeyUp = event => handleKeyUp(event, action => socket.emit(action), inputs, setInputs)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [socket])

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => socket.emit('start'), 10000)
      return () => clearInterval(interval)
    }
  }, [running])

  useEffect(() => {
    if (loading && running) {
      setTimeout(() => setConnectingSeconds(connectingSeconds + 1), 1000)
    } else {
      setConnectingSeconds(0)
    }
  }, [connectingSeconds, loading, running])

  useEffect(() => {
    checkLogin().then(isLoggedIn => {
      if (!isLoggedIn) {
        logout()
      }
    })

    const token = getToken()
    setToken(token)

    connectIO(token, error => setError(String(error)))
      .then(({ socket }) => {
        setSocket(socket)

      })
      .catch(error => setError(String(error)))

    setLoading(true)



    return () => {


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

    return <StatusContainer>{
      Object.keys(status).map(statusKey => {
        let label = statusKey.charAt(0).toUpperCase() + statusKey.substring(1).replace(/_/g, " ")
        let value = status[statusKey]
        if (statusKey === "battery_voltage") {
          const voltage = value / 1000.0
          const percent = ((voltage - 3.3) / (4.2 - 3.3)) * 100
          value = `${(percent.toFixed(0))}% (${(voltage).toFixed(2)}v)`
          label = "Battery"
        }
        value = value.replace("true", "YES").replace("false", "NO")
        return <StatusLine>{label}: <b>{value}</b></StatusLine>
      })
    }
    </StatusContainer>
  }

  const { up, left, down, right, cameraUp, cameraDown } = inputs

  if (!running) {
    return <Container>
      <h1>CatHunter 3.0 - idle</h1>
      {renderStatus(status)}
      <button onClick={() => setRunning(true)}>Start</button>
    </Container>
  }

  return (
    <Container >
      <h1>CatHunter 3.0</h1>
      {!loading && <VideoStreamRTC width={640} height={480} source={"catero_huntero_3.0"} token={token} />}
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
        {/* <CameraControl
          controller={controller}
          up={cameraUp}
          down={cameraDown}
        /> */}
        {renderPowerSelection()}
        {startedData?.started && <p>CatHunter last started {startedData?.started}.</p>}
        {startedData?.lastConnected && <p>Last user disconnected {startedData?.lastConnected}.</p>}
      </>}
      {error && <p className="disconnected">{JSON.stringify(error)}</p>}
      {renderStatus(status)}
      <button onClick={() => setRunning(false)}>Stop</button>
    </Container>
  )

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
  margin-top: 70px;
`

const StatusContainer = styled.div`
  text-align: center;
  align-self: center;
  border: 1px solid white;
  border-radius: 5px;
  padding: 1em;
  margin: 1em;
  min-width: 20%;
`

const StatusLine = styled.p`
  margin: 0;
  font-size: 1.2em;
  display: flex;
  justify-content: space-between;
`
