import React, { Component } from 'react';
import { checkLogin, logout } from "../../util/auth";
import VideoStream from '../molecules/videoStream';

const streams = [{
    url: '/cathunter',
    id: 'CatHunter',
}, {
    url: '/picam1',
    id: 'PiCam-1'
}, {
    url: '/picam2',
    id: 'PiCam-2'
}];

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
                    { this.renderStreams() }
                </div>
            </div>
        );
    };

    renderStreams() {
        const width = 640;
        const height = 480;

        return streams.map(stream =>
                <div className="p-surveillance--camera">
                    <VideoStream key={stream} id={stream.id} url={stream.url} width={width} height={height} />
                </div>
            );
    }

}

export default Surveillance;