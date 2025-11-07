import { API_URL } from '../pages/login'
import { useEffect, useState } from 'react'
import { checkAuth, logout } from '../../util/auth'
import VideoStreamRTC from '../molecules/videoStreamRTC'
import styled from 'styled-components'

export default function Escape() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    checkAuth()
      .then(({ token }) => setToken(token))
      .catch(() => logout())
  }, [])

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const beep = frequency => {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    //oscillator.type = 'square'
    oscillator.frequency.setTargetAtTime(frequency, context.currentTime, 0)
    oscillator.connect(context.destination)
    oscillator.start(0)
    oscillator.stop(context.currentTime + 2)
  }

  const code = [11, 34, 22]

  const beep_code = async () => {
    await sleep(3000)
    while (true) {
      for (let i = 0; i < code.length; i++) {
        beep(i === 0 ? 440 : 380)
        await sleep(code[i] * 1000)
      }
    }
  }

  useEffect(() => {
    beep_code()
    //beep(440)
  }, [])

  return (
    <Container>
      <StyledVideoStreamRTC
        width={1920}
        height={1080}
        source={'picamera2'}
        token={token}
      />
      <Overlay>{window.location.href.split('?')[1]}</Overlay>
      <LogCodeOverlay>LOG 663</LogCodeOverlay>
    </Container>
  )
}

const StyledVideoStreamRTC = styled(VideoStreamRTC)`
  position: absolute;
  width: 100%;
  height: 100vh;
`

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
`

const Overlay = styled.h1`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: green;
  background-color: #00000055;
  font-size: 4em;
`

const LogCodeOverlay = styled.h1`
  position: absolute;
  right: 0;
  bottom: 0;
  color: green;
  background-color: #00000055;
  font-size: 5em;
`

const CameraContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`
