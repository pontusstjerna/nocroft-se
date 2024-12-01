import * as actions from './robotPiActionTypes'

export const handleKeyDown = (event, onCommand, inputs, setInputs) => {
  const { up, left, down, right, cameraUp, cameraDown } = inputs

  switch (event.key) {
    case 'ArrowLeft':
      if (!left) {
        if (up) {
          onCommand(actions.LEFT)
        } else if (down) {
          onCommand(actions.LEFT)
        } else {
          onCommand(actions.ROTATE_LEFT)
        }

        setInputs({ ...inputs, left: true })
      }
      break

    case 'ArrowUp':
      if (!up) {
        if (left) {
          onCommand(actions.LEFT)
        } else if (right) {
          onCommand(actions.RIGHT)
        } else {
          onCommand(actions.FORWARD)
        }

        setInputs({ ...inputs, up: true })
      }
      break

    case 'ArrowRight':
      if (!right) {
        if (up) {
          onCommand(actions.RIGHT)
        } else if (down) {
          onCommand(actions.RIGHT)
        } else {
          onCommand(actions.ROTATE_RIGHT)
        }

        setInputs({
          ...inputs,
          right: true,
        })
      }
      break

    case 'ArrowDown':
      if (!down) {
        onCommand(actions.REVERSE)
        if (left) {
          onCommand(actions.LEFT)
        } else if (right) {
          onCommand(actions.RIGHT)
        } else {
          onCommand(actions.FORWARD)
        }

        setInputs({
          ...inputs,
          down: true,
        })
      }
      break
    case 'PageUp':
      if (!cameraUp) {
        onCommand(actions.TILT_CAMERA_UP)
        setInputs({ ...inputs, cameraUp: true })
      }
      break
    case 'PageDown':
      if (!cameraDown) {
        onCommand(actions.TILT_CAMERA_DOWN)
        setInputs({ ...inputs, cameraDown: true })
      }
      break
    default:
      return
  }

  event.preventDefault() // prevent the default action (scroll / move caret)
}

export const handleKeyUp = (event, onCommand, inputs, setInputs) => {
  const { up, left, down, right } = inputs

  switch (event.key) {
    case 'ArrowLeft':
      if (up || down) {
        onCommand(actions.FORWARD)
      } else {
        onCommand(actions.STOP)
      }

      setInputs({ ...inputs, left: false })
      break

    case 'ArrowUp':
      if (left) {
        onCommand(actions.ROTATE_LEFT)
      } else if (right) {
        onCommand(actions.ROTATE_RIGHT)
      } else {
        onCommand(actions.STOP)
      }

      setInputs({
        ...inputs,
        up: false,
      })
      break

    case 'ArrowRight':
      if (up || down) {
        onCommand(actions.FORWARD)
      } else {
        onCommand(actions.STOP)
      }

      setInputs({
        ...inputs,
        right: false,
      })
      break

    case 'ArrowDown':
      onCommand(actions.REVERSE)
      if (left) {
        onCommand(actions.ROTATE_LEFT)
      } else if (right) {
        onCommand(actions.ROTATE_RIGHT)
      } else {
        onCommand(actions.STOP)
      }

      setInputs({
        ...inputs,
        down: false,
      })
      break
    case 'PageUp':
      onCommand(actions.TILT_CAMERA_STOP)
      setInputs({ ...inputs, cameraUp: false })
      break
    case 'PageDown':
      onCommand(actions.TILT_CAMERA_STOP)
      setInputs({ ...inputs, cameraDown: false })
      break
    default:
      return

  }
  event.preventDefault() // prevent the default action (scroll / move caret)
}
