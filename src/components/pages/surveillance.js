import React, { Component } from 'react';
import { checkLogin, logout } from "../../util/auth";

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
            <div>Surveilance</div>
        );
    }

}

export default Surveillance;