import React, { Component } from 'react';
import * as types from './robotPiActionTypes';

class CtrlButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
        }

        this.onPressReverse = this.onPressReverse.bind(this);
        this.onReleaseReverse = this.onReleaseReverse.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onRelease = this.onRelease.bind(this);
    }

    onPressReverse() {
        const { controller } = this.props;
        controller.reverse();
        controller.forward();
        this.setState({active: true});
    }

    onReleaseReverse() {
        const { controller } = this.props;
        controller.stop();
        controller.reverse();
        this.setState({active: false});
    }

    onPress(action) {
        this.props.controller.perform(action);
        this.setState({active: true});
    }

    onRelease() {
        this.props.controller.stop();
        this.setState({active: false});
    }

    render() {
        const { action, active } = this.props;

        if (action === types.REVERSE) {
            return <button
                id={'btn-' + action}
                className={active || this.state.active ? 'active' : ''}
                onMouseDown={this.onPressReverse}
                onMouseUp={this.onReleaseReverse}
                onTouchStart={this.onPressReverse}
                onTouchEnd={this.onReleaseReverse}
            />
        }

        return <button
                className={active || this.state.active ? 'active' : ''}
                id={'btn-' + action}
                onMouseDown={() => this.onPress(action)}
                onMouseUp={this.onRelease}
                onTouchStart={() => this.onPress(action)}
                onTouchEnd={this.onRelease}
            />;
    }
}

export default CtrlButton;