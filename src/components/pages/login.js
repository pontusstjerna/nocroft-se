import React, { Component } from 'react';

export const API_URL = '/api';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggingIn: false,
            errorMessage: '',
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;

        fetch(`${API_URL}/login`, {
            method: 'POST',
            body: btoa(`${username}:${password}`),
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                let errorMessage = 'Invalid username or password.';
                switch (response.status) {
                    case 504:
                        errorMessage = 'Unable to connect to the server, please try again later.';
                        break;
                    default: break;
                }
                console.log(response.status);
                this.setState({errorMessage});
                return '';
            }
        })
        .then(token => {
            if (token) {
                window.sessionStorage.setItem('token-surveillance', token)
                window.location = '#/surveillance';
            }
        }).catch(err => {
            console.log(err);
        });

        this.setState({loggingIn: true});
    }

    render() {
        const { username, password, errorMessage } = this.state;
        return (
            <section className="p-admin">
                <h3>Nocroft Admin</h3>
                <form className="o-login" onSubmit={this.handleSubmit}>
                    <input type="text" value={username} onChange={e => this.setState({username: e.target.value})} placeholder="Username" />
                    <input type="password" value={password} onChange={e => this.setState({password: e.target.value})} placeholder="Password" />
                    <button type="Submit">Login</button>
                </form>
                <p className="o-login__error">{ errorMessage }</p>
            </section>
        );
    }
}

export default Login;