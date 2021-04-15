import React, { Component } from 'react'
import { checkLogin, logout } from '../../../util/auth'
import { getToken } from '../../../util/auth'
import { connectIO } from './socket.js'
import CtrlButton from './ctrlButton'
import Controller from './controller'
import * as types from './robotPiActionTypes'

import './style.css'
import VideoStream from '../../molecules/VideoStream'
import CameraControl from './CameraControl'

class RobotPi extends Component {
  constructor(props) {
    super(props)

    this.state = {
      socket: undefined,
      started: null,
      lastConnected: null,
      connecting: false,
      error: '',
      controller: null,
      inputs: {
        up: false,
        left: false,
        down: false,
        right: false,
        cameraUp: false,
        cameraDown: false,
      },
      status: null,
      powerSelectValue: '',
      setPowerLoading: false,
    }

    this.setupStatusInterval = this.setupStatusInterval.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onError = this.onError.bind(this)
    this.renderPowerSelection = this.renderPowerSelection.bind(this)
  }

  componentDidMount() {
    checkLogin().then(isLoggedIn => {
      if (!isLoggedIn) {
        logout()
      }
    })

    const token = getToken()

    connectIO(token, this.onError)
      .then(({ socket, started }) => {
        this.setState({
          started: started.started,
          lastConnected: started.lastConnected,
          connecting: false,
          controller: new Controller(socket),
          socket,
        })

        this.setupStatusInterval(socket)
      })
      .catch(this.onError)

    this.setState({ connecting: true })

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    const { socket, videoPlayer } = this.state

    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    if (socket) socket.close()
    if (videoPlayer) videoPlayer.stop()
  }

  setupStatusInterval(socket) {
    socket.on('status', status => {
      this.setState({
        status: status && JSON.parse(status),
        setPowerLoading: false,
      })
      setTimeout(() => socket.emit('status'), 5000)
    })
    socket.emit('status')
  }

  onKeyDown(event) {
    const { controller, inputs } = this.state
    const { up, left, down, right, cameraUp, cameraDown } = inputs

    switch (event.key) {
      case 'ArrowLeft':
        if (!left) {
          if (up) {
            controller.left()
          } else if (down) {
            controller.left()
          } else {
            controller.rotLeft()
          }

          this.setState({
            inputs: {
              ...this.state.inputs,
              left: true,
            },
          })
        }
        break

      case 'ArrowUp':
        if (!up) {
          if (left) {
            controller.left()
          } else if (right) {
            controller.right()
          } else {
            controller.forward()
          }

          this.setState({
            inputs: {
              ...this.state.inputs,
              up: true,
            },
          })
        }
        break

      case 'ArrowRight':
        if (!right) {
          if (up) {
            controller.right()
          } else if (down) {
            controller.right()
          } else {
            controller.rotRight()
          }

          this.setState({
            inputs: {
              ...this.state.inputs,
              right: true,
            },
          })
        }
        break

      case 'ArrowDown':
        if (!down) {
          controller.reverse()
          if (left) {
            controller.left()
          } else if (right) {
            controller.right()
          } else {
            controller.forward()
          }

          this.setState({
            inputs: {
              ...this.state.inputs,
              down: true,
            },
          })
        }
        break
      case 'PageUp':
        if (!cameraUp) {
          controller.cameraUp()
          this.setState({ inputs: { ...this.state.inputs, cameraUp: true } })
        }
        break
      case 'PageDown':
        if (!cameraDown) {
          controller.cameraDown()
          this.setState({ inputs: { ...this.state.inputs, cameraDown: true } })
        }
        break
      default:
        return
    }

    event.preventDefault() // prevent the default action (scroll / move caret)
  }

  onKeyUp(event) {
    const { controller, inputs } = this.state
    const { up, left, down, right } = inputs

    switch (event.key) {
      case 'ArrowLeft':
        if (up || down) {
          controller.forward()
        } else {
          controller.stop()
        }

        this.setState({
          inputs: {
            ...this.state.inputs,
            left: false,
          },
        })
        break

      case 'ArrowUp':
        if (left) {
          controller.rotLeft()
        } else if (right) {
          controller.rotRight()
        } else {
          controller.stop()
        }

        this.setState({
          inputs: {
            ...this.state.inputs,
            up: false,
          },
        })
        break

      case 'ArrowRight':
        if (up || down) {
          controller.forward()
        } else {
          controller.stop()
        }

        this.setState({
          inputs: {
            ...this.state.inputs,
            right: false,
          },
        })
        break

      case 'ArrowDown':
        controller.reverse()
        if (left) {
          controller.rotLeft()
        } else if (right) {
          controller.rotRight()
        } else {
          controller.stop()
        }

        this.setState({
          inputs: {
            ...this.state.inputs,
            down: false,
          },
        })
        break
      case 'PageUp':
        controller.cameraRelease()
        this.setState({ inputs: { ...this.state.inputs, cameraUp: false } })
        break
      case 'PageDown':
        controller.cameraRelease()
        this.setState({ inputs: { ...this.state.inputs, cameraDown: false } })
        break
      default:
        return
    }

    event.preventDefault() // prevent the default action (scroll / move caret)
  }

  onError(error) {
    const { socket } = this.state
    if (socket) {
      socket.close()
    }

    this.setState({ error: String(error) })
  }

  render() {
    const {
      started,
      lastConnected,
      connecting,
      error,
      controller,
      inputs,
      status,
    } = this.state
    const { up, left, down, right, cameraUp, cameraDown } = inputs

    return (
      <div className="p-cathunter">
        <h1>CatHunter 1.1</h1>
        <VideoStream target="robotpi" />
        <div className="buttons">
          <p>Movement control</p>
          <CtrlButton action={types.LEFT} controller={controller} />
          <CtrlButton
            action={types.FORWARD}
            active={up}
            controller={controller}
          />
          <CtrlButton action={types.RIGHT} controller={controller} />
          <br />
          <CtrlButton
            action={types.ROTATE_LEFT}
            active={left}
            controller={controller}
          />
          <CtrlButton
            action={types.REVERSE}
            active={down}
            controller={controller}
          />
          <CtrlButton
            action={types.ROTATE_RIGHT}
            active={right}
            controller={controller}
          />
        </div>
        <CameraControl
          controller={controller}
          up={cameraUp}
          down={cameraDown}
        />
        {this.renderPowerSelection()}
        {error && <p className="disconnected">{error}</p>}
        {connecting && <p>Connecting...</p>}
        {started && <p>CatHunter last started {started}.</p>}
        {lastConnected && <p>Last user disconnected {lastConnected}.</p>}
        {this.renderStatus(status)}
      </div>
    )
  }

  renderPowerSelection() {
    const { setPowerLoading, powerSelectValue, socket } = this.state

    if (setPowerLoading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <label for="power">Set power mode: </label>
        <select
          name="power"
          id="power"
          value={powerSelectValue}
          onChange={e => {
            const { value } = e.target
            this.setState({ powerSelectValue: value })
            if (value !== '') {
              socket.emit(value)
              this.setState({ setPowerLoading: true })
            }
          }}
        >
          <option value="">--Select power--</option>
          <option value={types.SET_POWER_LOW}>Low</option>
          <option value={types.SET_POWER_MEDIUM_LOW}>Mediun low</option>
          <option value={types.SET_POWER_MEDIUM}>Medium</option>
          <option value={types.SET_POWER_HIGH}>High</option>
        </select>
      </div>
    )
  }

  renderStatus(status) {
    if (!status) {
      return <p>Unable to get CatHunter system status.</p>
    }

    return (
      <p>
        {status.throttled}
        <br />
        <b>Power: </b>
        {`${status.power * 100}%`}
        <br />
        <b>Temperature: </b>
        {status.temp}
        <br />
        {status.volts && (
          <span>
            <b>Core volts: </b>
            {status.volts.core}
            <br />
            <b>SD RAM C volts: </b>
            {status.volts.sdram_c}
            <br />
            <b>SD RAM I volts: </b>
            {status.volts.sdram_i}
            <br />
            <b>SD RAM P volts: </b>
            {status.volts.sdram_p}
            <br />
          </span>
        )}
      </p>
    )
  }
}

export default RobotPi
