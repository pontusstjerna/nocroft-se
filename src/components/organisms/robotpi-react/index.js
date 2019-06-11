import React, { Component } from 'react';

import io from 'socket.io-client';
import { connectIO, connectWS } from './socket.js';

import './style.css';


class RobotPi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: undefined,
            isServerStarted: false,
            connecting: false,
            error: '',
        };
    }

    componentDidMount() {
        const { videoURL, token } = this.props;

        connectIO('', token)
        .then(isServerStarted => this.setState({isServerStarted: isServerStarted, connecting: false,}))
        .catch(error => this.setState({error, connecting: false}));

        this.setState({connecting: true});

        const player = connectWS(this.refs.canvas, videoURL, token);
    }

    render() {
        const { isServerStarted, connecting, error } = this.state;

        return (
            <div >
                <h1>CatHunter 1.1</h1>
                <canvas ref="video-canvas" id="video-canvas" width="640" height="480">
                    <p>
                        Please use a browser that supports the Canvas Element, like
                        <a href="http://www.google.com/chrome">Chrome</a>,
                        <a href="http://www.mozilla.com/sfirefox/">Firefox</a>,
                        <a href="http://www.apple.com/safari/">Safari</a> or Internet Explorer 10
                    </p>
                </canvas>
                <div className="buttons">
                    <div id="btnLeft"/>
                    <div id="btnForward"/>
                    <div id="btnRight" />
                    <br/>
                    <div id="btnRotLeft"/>
                    <div id="btnBackward"/>
                    <div id="btnRotRight"/>
                </div>
                { error && 
                    <p className="disconnected">{error}</p>
                }
                { connecting &&
                    <p>Connecting...</p>
                }
                { isServerStarted &&
                    <p>Server last started {isServerStarted}.</p>
                }

            </div>
        );
    }
}

export default RobotPi;