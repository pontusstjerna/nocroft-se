import * as types from './robotPiActionTypes'

class Controller {
  constructor(socket) {
    this.socket = socket
  }

  perform(action) {
    this.socket.emit(action)
  }

  forward() {
    this.socket.emit(types.FORWARD)
  }

  backward() {
    this.socket.emit(types.BACKWARD)
  }

  left() {
    this.socket.emit(types.LEFT)
  }

  right() {
    this.socket.emit(types.RIGHT)
  }

  rotLeft() {
    this.socket.emit(types.ROTATE_LEFT)
  }

  rotRight() {
    this.socket.emit(types.ROTATE_RIGHT)
  }

  reverse() {
    this.socket.emit(types.REVERSE)
  }

  stop() {
    this.socket.emit(types.STOP)
  }

  setPowerLow() {
    this.socket.emit(types.SET_POWER_LOW)
  }
  setPowerMediumLow() {
    this.socket.emit(types.SET_POWER_MEDIUM_LOW)
  }
  setPowerMedium() {
    this.socket.emit(types.SET_POWER_MEDIUM)
  }
  setPowerHigh() {
    this.socket.emit(types.SET_POWER_HIGH)
  }

  cameraUp() {
    this.socket.emit(types.TILT_CAMERA_UP)
  }

  cameraDown() {
    this.socket.emit(types.TILT_CAMERA_DOWN)
  }

  cameraRelease() {
    this.socket.emit(types.TILT_CAMERA_STOP)
  }
}

export default Controller
