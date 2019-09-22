import React, { Component } from 'react';
import { login } from "../../util/auth";

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

        login(username, password).then(token => {
            if (token) {
                window.sessionStorage.setItem('token-surveillance', token);
                this.props.history.push('/admin');
            }
        }).catch(err => {
            this.setState({errorMessage: err.message, loggingIn: false});
        });

        this.setState({loggingIn: true});
    };

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