import React, { Component } from 'react';

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

        fetch('/login', {
            headers: {
                'Authorization': 'basic ' + btoa(`${username}:${password}`)
            }
        }).then(response => {
            if (response.ok) {
                response.text().then(this.props.onLogin);
            } else {
                alert('Invalid username or password.');
            }

            this.setState({loggingIn: false});
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