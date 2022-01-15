import React, { useState } from 'react'

export default function CtrlButton({
  controller,
  releaseAction,
  active,
  action,
}) {
  const [localActive, setActive] = useState(false)

  const onPress = () => {
    controller.perform(action)
    setActive(true)
  }

  const onRelease = () => {
    if (releaseAction) {
      controller.perform(releaseAction)
    } else {
      controller.stop()
    }

    setActive(false)
  }

  return (
    <button
      className={active || localActive ? 'active' : ''}
      id={'btn-' + action}
      onMouseDown={e => {
        e.preventDefault()
        return onPress()
      }}
      onMouseUp={onRelease}
      onTouchStart={e => {
        e.preventDefault()
        return onPress()
      }}
      onTouchEnd={onRelease}
    />
  )
}
