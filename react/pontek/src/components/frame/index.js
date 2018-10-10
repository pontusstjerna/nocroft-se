import React, { Component } from 'react';
import Footer from '../footer';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import Home from '../home';
import Autoflirt from '../autoflirt';
import About from '../about';

class Frame extends Component {

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="menu">
                        <NavLink className="menu-item" exact to="/">Home</NavLink>
                        <NavLink className="menu-item" to="/autoflirt">Pick-up line Generator</NavLink>                        
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