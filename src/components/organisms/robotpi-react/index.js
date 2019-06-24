import React, { Component } from 'react';

import { connectIO, connectVideoCanvas } from './socket.js';
import { API_URL } from '../../pages/login.js';
import CtrlButton from './ctrlButton';
import Controller from './controller';
import * as types from './robotPiActionTypes';


import './style.css';


class RobotPi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoPlayer: undefined,
            socket: undefined,
            isServerStarted: false,
            connecting: false,
            error: '',
            controller: null,
            inputs: {
                up: false,
                left: false,
                down: false,
                right: false,
            },
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        const { socketURL, videoURL, token } = this.props;

        connectIO(socketURL, token, this.onError)
        .then(({socket, isStarted}) => this.setState({
            isServerStarted: isStarted,
            connecting: false,
            controller: new Controller(socket),
            socket
        }))
        .catch(this.onError);

        fetch(`${API_URL}/access-token`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        }).then(response => {
            if (!response.ok) {
                console.log('Failed to get video access token');
            } else {
                return response.text();
            }
        }).then(videoToken => {
            const videoPlayer = connectVideoCanvas(document.getElementById("video-canvas"), videoURL + '?access_token=' + videoToken, token, this.onError);
            this.setState({videoPlayer});
        });

        this.setState({connecting: true,});

        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
        const { socket, videoPlayer } = this.state;

        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);

        if (socket) socket.close();
        if (videoPlayer) videoPlayer.stop();
    }

    onKeyDown(event) {
        const { controller, inputs } = this.state;
        const { up, left, down, right } = inputs;

        switch(event.key) {
            case 'ArrowLeft':
                if (!left) {
                    if (up) {
                        controller.left();
                    } else if (down) {
                        controller.left();
                    } else {
                        controller.rotLeft();
                    }

                    this.setState({
                        inputs: {
                            ...this.state.inputs,
                            left: true,
                        }
                    });
                }
                break;

            case 'ArrowUp':
                if (!up) {
                    if (left) {
                        controller.left();
                    } else if (right) {
                        controller.right();
                    } else {
                        controller.forward();
                    }

                    this.setState({
                        inputs: {
                            ...this.state.inputs,
                            up: true,
                        }
                    });
                }
                break;

            case 'ArrowRight':
                if (!right) {
                    if (up) {
                        controller.right();
                    } else if (down) {
                        controller.right();
                    } else {
                        controller.rotRight();
                    }

                    this.setState({
                        inputs: {
                            ...this.state.inputs,
                            right: true,
                        }
                    });
                }
                break;

            case 'ArrowDown':
                if (!down) {
                    controller.reverse();
                    if (left) {
                        controller.left();
                    } else if (right) {
                        controller.right();
                    } else {
                        controller.forward();
                    }

                    this.setState({
                        inputs: {
                            ...this.state.inputs,
                            down: true,
                        }
                    });
                }
                break;

            default: return;
        }

        event.preventDefault(); // prevent the default action (scroll / move caret)
    }

    onKeyUp(event) {
        const { controller, inputs } = this.state;
        const { up, left, down, right } = inputs;

        switch(event.key) {
            case 'ArrowLeft':
                if (up || down) {
                    controller.forward();
                } else {
                    controller.stop();
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        left: false,
                    }
                });
                break;

            case 'ArrowUp':
                if (left) {
                    controller.rotLeft();
                } else if (right) {
                    controller.rotRight();
                } else {
                    controller.stop();
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        up: false,
                    }
                });
                break;

            case 'ArrowRight':
                if (up || down) {
                    controller.forward();
                } else {
                    controller.stop();
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        right: false,
                    }
                });
                break;

            case 'ArrowDown':
                controller.reverse();
                if (left) {
                    controller.rotLeft();
                } else if (right) {
                    controller.rotRight();
                } else {
                    controller.stop();
                }

                this.setState({
                    inputs: {
                        ...this.state.inputs,
                        down: false,
                    }
                });
                break;

            default: return;
        }

        event.preventDefault(); // prevent the default action (scroll / move caret)
    }

    onError(error) {
        const { socket, videoPlayer } = this.state;
        if (socket) {
            socket.close();
        }

        if (videoPlayer) {
            videoPlayer.destroy();
        }

        this.setState({error: String(error)});
    }

    render() {
        const { isServerStarted, connecting, error, controller, inputs, errorMessage } = this.state;
        const { up, left, down, right } = inputs;

        return (
            <div>
                <h1>CatHunter 1.1</h1>
                <canvas ref="videoCanvas" id="video-canvas" width="640" height="480">
                    <p>
                        Please use a browser that supports the Canvas Element, like
                        <a href="http://www.google.com/chrome">Chrome</a>,
                        <a href="http://www.mozilla.com/sfirefox/">Firefox</a>,
                        <a href="http://www.apple.com/safari/">Safari</a> or Internet Explorer 10
                    </p>
                </canvas>
                <div className="buttons">
                    <CtrlButton action={types.LEFT} controller={controller} />
                    <CtrlButton action={types.FORWARD} active={up} controller={controller} />
                    <CtrlButton action={types.RIGHT} controller={controller} />
                    <br/>
                    <CtrlButton action={types.ROTATE_LEFT} active={left} controller={controller} />
                    <CtrlButton action={types.REVERSE} active={down} controller={controller} />
                    <CtrlButton action={types.ROTATE_RIGHT} active={right} controller={controller} />
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