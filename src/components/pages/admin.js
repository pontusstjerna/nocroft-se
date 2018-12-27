import React, { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <section className="p-admin">
                <form className="o-login" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.username} onChange={username => this.setState({username})} placeholder="Username" />
                    <input type="password" value={this.password} onChange={password => this.setState({password})} placeholder="Password" />
                    <button type="Submit">Login</button>
                </form>
            </section>
        );
    }
}

export default Admin;