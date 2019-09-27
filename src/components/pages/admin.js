import React, { Component } from 'react';
import { checkAuth, logout } from "../../util/auth";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretMessage: '',
            token: null,
        }
    }

    componentDidMount = () => {
        checkAuth().then(({secretMessage, token}) => {
            this.setState({secretMessage, token});
        }).catch(err => {
            console.log(err);
            logout();
        });
    };

    render() {
        return (
            <div className="p-surveillance">
                <p>{this.state.secretMessage}</p>
            </div>
        );
    }
}

export default Admin;