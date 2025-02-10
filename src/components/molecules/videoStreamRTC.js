import { useEffect, useRef, useState } from "react"
import { API_URL } from "../pages/login"
import io from 'socket.io-client'
import styled from "styled-components"

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
            const peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "turn:nocroft.se:3478?transport=tcp",
                        username: "webserver",
                        credential: "maskros"
                    },
                ],
            })

            const iceGatheringComplete = new Promise((resolve) => {
                peerConnection.onicegatheringstatechange = (event) => {
                    console.log('icegatheringstatechange -> ', peerConnection?.iceGatheringState);

                    if (peerConnection.iceGatheringState === 'complete') {
                        console.log('iceCandidates -> ', iceCandidates);
                        resolve();
                    }
                };
            });

            peerConnection.ontrack = event => {
                console.log(`Got ${event.track.kind} event from peer connection.`)
                if (event.track.kind === "video") {
                    videoRef.current.srcObject = event.streams[0]
                    setLoading(false)
                }
            }
            peerConnection.addTransceiver("video", { direction: "recvonly" })

            const iceCandidates = []

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('icecandidate -> ', event.candidate);
                    iceCandidates.push(event.candidate.toJSON());
                }
            };

            peerConnection.createOffer().then(offer =>
                peerConnection.setLocalDescription(offer)
            )
                .then(() => iceGatheringComplete)
                .then(() => {
                    const offer = peerConnection.localDescription
                    const sdp = offer.sdp + iceCandidates.map((candidate) => `a=${candidate.candidate}`).join('\r\n') + '\r\n'
                    return fetch(`${API_URL}/video_offer/${source}`, {
                        method: "POST",
                        body: JSON.stringify({
                            offer: { sdp: sdp, type: offer.type },
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
`

const Label = styled.p`
    position: absolute;
    left: 4px;
    top: 0;
    background-color: #00000055;
`

