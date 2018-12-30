import React, { Component } from 'react';

export const API_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : '/api';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggingIn: false,
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
                alert('Invalid username or password.');
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
        return (
            <section className="p-admin">
                <form className="o-login" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.username} onChange={e => this.setState({username: e.target.value})} placeholder="Username" />
                    <input type="password" value={this.password} onChange={e => this.setState({password: e.target.value})} placeholder="Password" />
                    <button type="Submit">Login</button>
                </form>
            </section>
        );
    }
}

export default Admin;