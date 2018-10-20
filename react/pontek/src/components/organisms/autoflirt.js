import React, { Component } from 'react';
import Typed from 'typed.js';
import generate from '../../autoflirt';
import heartIcon from '../../assets/heart.svg';

const MAX_FLIRTS = 100;

class Autoflirt extends Component {

    componentDidMount() {
        
        let strings = []; 
        for(let i = 0; i < MAX_FLIRTS; i++) {
            strings.push(generate());
        }

        const options = {
            strings,
            typeSpeed: 20,
            backSpeed: 20,
            backDelay: 3000,
            smartBackspace: true,
        };

        this.typed = new Typed(this.flirtContainer, options);

        this.typed.start();
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <section className="o-autoflirt">
                <h1>Autoflirt <img src={heartIcon} /></h1>
                <p><i>Auto-generated real-time non-cloud based pickup lines for the modern date &copy;</i></p>
                <div className="o-autoflirt__flirt">
                    <span ref={flirtContainer => this.flirtContainer = flirtContainer} />
                </div>
            </section>
        );
    }
}

export default Autoflirt;