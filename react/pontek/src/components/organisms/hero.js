import React, { Component } from 'react';
import Symmetry from '../molecules/symmetry';

class Hero extends Component {

    getImg(imgs) {
        console.log(imgs);
        return 'assets/heros/' + imgs[Math.floor(Math.random() * (imgs.length))];
    }

    render() {
        const { imgs } = this.props;

        return (
            <div className="o-hero" >
                <div className="o-hero__img" style={{backgroundImage: 'url(' + this.getImg(imgs) + ')'}}></div>
                <Symmetry strokeWidth="3" />
                <h1 className="o-hero__title"><a href="/">nocroft.se</a></h1>
            </div>
        )
    }
}

export default Hero;