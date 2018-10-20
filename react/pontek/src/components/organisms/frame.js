import React, { Component } from 'react';
import Footer from './footer.js';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import Home from '../home';
import Autoflirt from '../autoflirt';
import About from '../about';

class Frame extends Component {

    scrollTo(section) {
        setTimeout(() => window.scrollTo({
            top: 800,
              behavior: 'smooth',
          }), 5);
    } 

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="menu">
                        <NavLink className="menu-item" exact to="/">Home</NavLink>
                        <a className="menu-item" href="#" onClick={() => this.scrollTo('section-apps')} >Apps</a>
                        <NavLink className="menu-item" to="/autoflirt">Autoflirt</NavLink>                        
                        <NavLink className="menu-item" to="/about">About me </NavLink>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/autoflirt" component={Autoflirt} />
                        <Route path="/about" component={About} />
                    </div>
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default Frame;