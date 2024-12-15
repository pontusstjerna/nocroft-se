import { useEffect, useRef, useState } from "react"
import { checkAuth, logout } from "../../util/auth"
import { API_URL } from "../pages/login"
import io from 'socket.io-client'
import styled from "styled-components"

const newLocal = "Got  "
export default function VideoStreamRTC({ source, token, width, height }) {

    const videoRef = useRef(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) {
            return
        }
        const socket = io(`/video`, {
            auth: { token, room: source },
        })

        socket.on('connect', () => {
            console.log("Socket connected to " + source)
            setLoading(true)
            const peerConnection = new RTCPeerConnection({ sdpSemantics: 'unified-plan' })

            peerConnection.ontrack = event => {
                console.log(`Got ${event.track.kind} event from peer connection.`)
                if (event.track.kind === "video") {
                    videoRef.current.srcObject = event.streams[0]
                    setLoading(false)
                }
            }
            peerConnection.addTransceiver("video", { direction: "recvonly" })

            peerConnection.createOffer().then(offer =>
                peerConnection.setLocalDescription(offer)
            )
                .then(() => new Promise(resolve => peerConnection.onicecandidate = () => resolve()))
                .then(() => {
                    const offer = peerConnection.localDescription
                    return fetch(`${API_URL}/video_offer/${source}`, {
                        method: "POST",
                        body: JSON.stringify({
                            offer: { sdp: offer.sdp, type: offer.type },
                            socketId: socket.id
                        }),
                        headers: {
                            "Authorization": `bearer ${token}`,
                            'Content-Type': 'application/json'

                        }
                    })
                }).then(() => {
                    socket.removeListener("answer")
                    socket.on("answer", answer => {
                        console.log("Got video answer, starting stream!")
                        if (peerConnection) {
                            peerConnection.setRemoteDescription(answer)
                        }
                    })
                })
        })


    }, [token])

    return <Container>
        <Video ref={videoRef} autoPlay={true} muted={true} playsInline={true} />
        <Label><b>{source}</b> {loading ? 'Loading...' : ''}</Label>
    </Container>
}

const Container = styled.div`
    position: relative;   
    height: 480px;
    width: 100%;

    @media screen and (min-width: 710px) {
        width: 640px;
        height: 480px;
    }
`

const Video = styled.video`
    border: 2px solid #303030;
    width: 100%;
    height: 100;
`

const Label = styled.p`
    position: absolute;
    left: 4px;
    top: 0;
    background-color: #00000055;
`
