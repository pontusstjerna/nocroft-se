import React, { Component } from 'react';
import Footer from '../footer';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import Home from '../home';
import BouncingBalls from '../bouncing-balls';
import About from '../about';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/default.css';
import './frame.css';

class Frame extends Component {

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="col-md-11 menu">
                        <NavLink className="menu-item" exact to="/">Home</NavLink>
                        <NavLink className="menu-item" to="/bouncingBalls">Bouncing Balls</NavLink>
                        <NavLink className="menu-item" to="/about">About me </NavLink>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/bouncingBalls" component={BouncingBalls} />
                        <Route path="/about" component={About} />
                    </div>
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default Frame;