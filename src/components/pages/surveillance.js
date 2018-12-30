import React, { Component } from 'react';

import { API_URL } from './admin.js';

class Surveillance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretMessage: '',
        }
    }

    componentDidMount = () => {
        this.checkAuth();
    }

    checkAuth = () => {
        const token = window.sessionStorage.getItem('token-surveillance');
        if (!token) {
            this.logout();
            return;
        }

        fetch(`${API_URL}/login`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        }).then(response => {
            if (!response.ok) {
                response.text().then(console.log);
                this.logout();
            } else {
                return response.text();
            }
        }).then(text => this.setState({secretMessage: text}));
    }

    logout = () => {
        window.sessionStorage.removeItem('token-surveillance');
        window.location = "#/admin";
    }

    render() {
    
        return (
            <div className="p-surveillance">
                <p>{this.state.secretMessage}</p>
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}

export default Surveillance;