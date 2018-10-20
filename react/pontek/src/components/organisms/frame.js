import React, { Component } from 'react';
import Footer from './footer.js';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';

import Home from '../pages/home.js';
import Autoflirt from '../pages/autoflirt.js';
import PrivacyPolicy from '../pages/privacyPolicy.js';
import About from '../pages/about.js';

class Frame extends Component {

    scrollTo(section) {
        setTimeout(() => window.scrollTo({
            top: document.getElementById(section).getBoundingClientRect().top,
              behavior: 'smooth',
          }), 5);
    } 

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="menu">
                        <a className="menu-item" href="#/" onClick={() => this.scrollTo('section-home')} >Home</a>                        
                        <a className="menu-item" href="#" onClick={() => this.scrollTo('section-apps')} >Apps</a>
                        {/* <NavLink className="menu-item" to="/autoflirt">Autoflirt</NavLink>                        
                        <NavLink className="menu-item" to="/about">About me </NavLink> */}
                        <NavLink className="menu-item" to="/privacyPolicy">Privacy Policy</NavLink>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        {/* <Route path="/autoflirt" component={Autoflirt} />
                        <Route path="/about" component={About} /> */}
                        <Route path="/privacyPolicy" component={PrivacyPolicy} />
                    </div>
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default Frame;