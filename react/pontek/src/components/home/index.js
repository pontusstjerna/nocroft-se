import React, { Component } from 'react';
import generate from '../../autoflirt';
import Hero from '../organisms/hero.js';
import Apps from '../organisms/apps.js';

import windows from '../../assets/windows.svg';

class Home extends Component {

    state = {
        flirt: '',
    }

    componentDidMount() {
        document.title = 'Pontek.se - Home';
        this.setState({flirt: generate()});
    }



    render() {
        return (
            <div className="home-container">
                <Hero imgs={['tree.jpg', 'sky.jpg']} />
                <Apps />
            </div>
        );
    }
}

export default Home;
