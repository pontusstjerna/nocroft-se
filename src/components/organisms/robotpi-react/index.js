import React, { Component } from 'react';

import io from 'socket.io-client';
import { connectIO, connectWS } from './socket.js';
import CtrlButton from './ctrlButton';
import Controller from './controller';
import * as types from './robotPiActionTypes';

import './style.css';


class RobotPi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: undefined,
            isServerStarted: false,
            connecting: false,
            error: '',
            controller: null,
        };
    }

    componentDidMount() {
        const { videoURL, token } = this.props;

        connectIO('', token)
        .then(({socket, isStarted}) => this.setState({
            isServerStarted: isStarted,
            connecting: false,
            controller: new Controller(socket)
        }))
        .catch(error => this.setState({error, connecting: false}));

        this.setState({connecting: true});

        const player = connectWS(this.refs.canvas, videoURL, token);
    }

    render() {
        const { isServerStarted, connecting, error, controller } = this.state;

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
                    <CtrlButton action={types.LEFT} controller={controller} />
                    <CtrlButton action={types.FORWARD} controller={controller} />
                    <CtrlButton action={types.RIGHT} controller={controller} />
                    <br/>
                    <CtrlButton action={types.ROTATE_LEFT} controller={controller} />
                    <CtrlButton action={types.REVERSE} controller={controller} />
                    <CtrlButton action={types.ROTATE_RIGHT} controller={controller} />
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