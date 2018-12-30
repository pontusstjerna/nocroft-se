import React, { Component } from 'react';
import './style.css';

class RobotPi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            connected: false,
        };
    }

    render() {
        const { connected } = this.state;

        return (
            <div >
                <h1>CatHunter 1.1</h1>
                <canvas id="video-canvas" width="640" height="480">
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
                { !connected &&
                    <p className="disconnected">Disconnected.</p>
                }
            </div>
        );
    }
}

export default RobotPi;