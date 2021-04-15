export const handleKeyDown = (event, controller, inputs, setInputs) => {
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

        setInputs({ ...inputs, left: true })
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

        setInputs({ ...inputs, up: true })
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

        setInputs({
          ...inputs,
          right: true,
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

        setInputs({
          ...inputs,
          down: true,
        })
      }
      break
    case 'PageUp':
      if (!cameraUp) {
        controller.cameraUp()
        setInputs({ ...inputs, cameraUp: true })
      }
      break
    case 'PageDown':
      if (!cameraDown) {
        controller.cameraDown()
        setInputs({ ...inputs, cameraDown: true })
      }
      break
    default:
      return
  }

  event.preventDefault() // prevent the default action (scroll / move caret)
}

export const handleKeyUp = (event, controller, inputs, setInputs) => {
  const { up, left, down, right } = inputs

  switch (event.key) {
    case 'ArrowLeft':
      if (up || down) {
        controller.forward()
      } else {
        controller.stop()
      }

      setInputs({ ...inputs, left: false })
      break

    case 'ArrowUp':
      if (left) {
        controller.rotLeft()
      } else if (right) {
        controller.rotRight()
      } else {
        controller.stop()
      }

      setInputs({
        ...inputs,
        up: false,
      })
      break

    case 'ArrowRight':
      if (up || down) {
        controller.forward()
      } else {
        controller.stop()
      }

      setInputs({
        ...inputs,
        right: false,
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

      setInputs({
        ...inputs,
        down: false,
      })
      break
    case 'PageUp':
      controller.cameraRelease()
      setInputs({ ...inputs, cameraUp: false })
      break
    case 'PageDown':
      controller.cameraRelease()
      setInputs({ ...inputs, cameraDown: false })
      break
    default:
      return

      event.preventDefault() // prevent the default action (scroll / move caret)
  }
}
