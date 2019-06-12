import React, { Component } from 'react';
import * as types from './robotPiActionTypes';

class CtrlButton extends Component {

    constructor(props) {
        super(props);

        this.onPressReverse = this.onPressReverse.bind(this);
        this.onReleaseReverse = this.onReleaseReverse.bind(this);
    }

    onPressReverse() {
        const { controller } = this.props;
        controller.reverse();
        controller.forward();
    }

    onReleaseReverse() {
        const { controller } = this.props;
        controller.stop();
        controller.reverse();
    }

    render() {
        const { action, controller } = this.props;

        if (action === types.REVERSE) {
            return <button
                id={'btn-' + action}
                onMouseDown={this.onPressReverse}
                onMouseUp={this.onReleaseReverse}
                onTouchStart={this.onPressReverse}
                onTouchEnd={this.onReleaseReverse}
            />
        }

        return <button
                id={'btn-' + action}
                onMouseDown={() => controller.perform(action)}
                onMouseUp={() => controller.stop()}
                onTouchStart={() => controller.perform(action)}
                onTouchEnd={() => controller.stop()}
            />;
    }
}

export default CtrlButton;