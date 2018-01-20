import React, { Component } from 'react';
import Symmetry from '../assets/symmetry';
import '../css/default.css';

class App extends Component {

    startAnimation(svg) {
        svg.animate();
    }

    render() {
        
        return (
            <div>
                <header className="App-header">
                    <Symmetry ref={this.startAnimation}/>
                    <h1>Under construction!</h1>
                </header>
                <p className="Text">
                    This will later be the new version of Pontek.se.
                </p>
            </div>
        );
    }
}

export default App;
