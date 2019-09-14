import React, { Component } from 'react';
import RobotPi from '../organisms/robotpi-react';
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
    }

    shouldComponentUpdate = () => {
        return true;
    }

    render() {
    
        const { robotPi, token } = this.state;

        return (
            <div className="p-surveillance">
                {robotPi &&
                    <div className="container">
                        <RobotPi socketURL="" token={token} videoURL={'wss://' + window.location.host.split(':')[0] + '/video'} />
                        <button onClick={() => this.setState({robotPi: false})}>Exit CatHunter </button>                        
                    </div>
                }
                {!robotPi &&
                    <div className="container">
                        <p>{this.state.secretMessage}</p>
                        <button onClick={() => this.setState({robotPi: true})}>CatHunter </button>
                    </div>
                }
                <button onClick={logout}>Log out</button>
            </div>
        );
    }
}

export default Admin;