import React from 'react'
import ControlButton from './ctrlButton'

export default ({ controller, up, down }) => {
  return (
    <div className="buttons">
      <p>Camera control</p>
      <ControlButton
        action="tilt_camera_up"
        releaseAction="tilt_camera_stop"
        controller={controller}
        active={up}
      />
      <ControlButton
        action="tilt_camera_down"
        releaseAction="tilt_camera_stop"
        controller={controller}
        active={down}
      />
    </div>
  )
}
