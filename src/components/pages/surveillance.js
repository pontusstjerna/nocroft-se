import React, { Component } from 'react'
import { checkLogin, logout } from '../../util/auth'
import VideoStream from '../molecules/videoStream'

class Surveillance extends Component {
  componentDidMount() {
    checkLogin().then(isLoggedIn => {
      if (!isLoggedIn) {
        logout()
      }
    })
  }

  render() {
    return (
      <div className="p-surveillance">
        <h2>Cameras</h2>
        <div className="p-surveillance--cameras">
          <VideoStream target="picam1" />
          <VideoStream target="picam2" />
          <VideoStream target="servercam" />
          <VideoStream target="robotpi" />
        </div>
      </div>
    )
  }
}

export default Surveillance
