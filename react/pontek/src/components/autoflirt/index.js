import React, { Component } from 'react';
import generate from 'autoflirt';

const generationInterval = undefined;

class Autoflirt extends Component {

    state = {
        fullFlirt: '',
        flirt: '',
    }

    startGeneration() {
        generate().then(result => this.setState({flirt: result}));
        
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Autoflirt</h1>
                        <p className="slogan">Generating awesome pick-up lines since 2018 &copy;</p>
                    </div>
                </div>
                <div className="row">
                    <div className="text-flirt offset-md-4 col-md-4 text-center container-margin">
                        <h3>{this.state.flirt ? `"${this.state.flirt}"` : ''}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <button className="big-button">Generate</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Autoflirt;