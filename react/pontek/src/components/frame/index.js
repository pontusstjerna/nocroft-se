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

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/default.css';
import '../../css/frame.css';

class Frame extends Component {

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="col-md-11 menu">
                        <NavLink className="menu-item" exact to="/">Home</NavLink>
                        <NavLink className="menu-item" to="/autoflirt">Pick-up line Generator</NavLink>
                        <div className="dropdown">
                            <div className="menu-item">
                                Legacy Webapps
                            </div>
                            <div className="dropdown-content">
                                <a className="menu-item" href="/legacy/apps/balls/balls.html">Bouncing Balls</a>
                                <a className="menu-item" href="/legacy/apps/textgen/textgen.html">Weird text generator</a>
                                <a className="menu-item" href="/legacy/apps/textfikon/textfikon.html">Fikon language generator</a>
                                <a className="menu-item" href="/legacy/apps/textrev/textrev.html">Text reverser</a>
                                <a className="menu-item" href="/legacy/apps/algorithms/algo.html">Algorithm stuff</a>
                            </div>
                        </div>
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