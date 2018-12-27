import React, { Component } from 'react';

class Surveillance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: props.token,
        }
    }

    render() {
        const { token } = this.state;
        if (!token) {
            window.location = "#/login";
        }

        return (
            <div className="p-surveillance">
                Du är superinloggad
            </div>
        );
    }
}

export default Surveillance;