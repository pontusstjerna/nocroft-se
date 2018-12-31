import React, { Component } from 'react';

import { connectIO, connectWS } from './socket.js';

import './style.css';


class RobotPi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: undefined,
            serverStarted: false,
            connecting: false,
            error: '',
            player: undefined,
        };
    }

    componentDidMount() {
        const { socketURL, videoURL, token } = this.props;

        connectIO(socketURL, token)
        .then(serverStarted => this.setState({serverStarted, connecting: false,}))
        .catch(error => this.setState({error, connecting: false}));

        this.setState({connecting: true});

        const player = connectWS(this.refs.canvas, videoURL, token);
    }

    render() {
        const { serverStarted, connecting, error } = this.state;

        return (
            <div >
                <h1>CatHunter 1.1</h1>
                <canvas ref="video-canvas" id="video-canvas" width="640" height="480">
                    <p>
                        Please use a browser that supports the Canvas Element, like
                        <a href="http://www.google.com/chrome">Chrome</a>,
                        <a href="http://www.mozilla.com/firefox/">Firefox</a>,
                        <a href="http://www.apple.com/safari/">Safari</a> or Internet Explorer 10
                    </p>
                </canvas>
                <div className="buttons">
                    <div id="btnLeft"></div>
                    <div id="btnForward"></div>
                    <div id="btnRight" ></div>
                    <br/>
                    <div id="btnRotLeft"></div>
                    <div id="btnBackward"></div>
                    <div id="btnRotRight"></div>
                </div>
                { error && 
                    <p className="disconnected">{error}</p>
                }
                { connecting &&
                    <p>Connecting...</p>
                }
                { serverStarted &&
                    <p>Server last started {serverStarted}.</p>
                }

            </div>
        );
    }
}

export default RobotPi;