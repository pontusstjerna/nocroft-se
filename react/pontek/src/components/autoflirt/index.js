import React, { Component } from 'react';
import generate from 'autoflirt';

let generationInterval = undefined;

class AutoflirtView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullFlirt: '',
            flirt: '',
        }

        this.startGeneration = this.startGeneration.bind(this);
    }

    componentDidMount() {
        this.startGeneration();
    }

    startGeneration() {

        const { fullFlirt, flirt } = this.state;

        if (flirt.length < fullFlirt.length) {
            return;
        }

        this.setState({fullFlirt: generate(), flirt: ''});
        generationInterval = setInterval(() => {

            const { fullFlirt, flirt } = this.state;

            if (fullFlirt.length === flirt.length) {
                clearInterval(generationInterval);
            } else {
                this.setState({
                    flirt: flirt + fullFlirt.charAt(flirt.length)
                });
            }

        }, 30);
        //this.setState({flirt: generate()});
    }

    render() {
        const { flirt, fullFlirt } = this.state;
        const done = flirt.length === fullFlirt.length;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Autoflirt</h1>
                        <p className="slogan">Generating awesome pick-up lines since 2018 &copy;</p>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-flirt offset-md-2 col-md-8">{flirt ? flirt : ''}</h1>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <button onClick={this.startGeneration} style={{visibility: done ? 'visible' : 'hidden'}} className="big-button">Get another!</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AutoflirtView;