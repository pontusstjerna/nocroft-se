import React, { Component } from 'react';
import Footer from './footer.js';
import {
    Route,
    NavLink,
    HashRouter
  } from 'react-router-dom';
import { isLoggedIn, logout, } from "../../util/auth";

import Home from '../pages/home.js';
import Autoflirt from '../pages/autoflirt.js';
import PrivacyPolicy from '../pages/privacyPolicy.js';
import Login from '../pages/login.js';
import About from '../pages/about.js';
import Admin from '../pages/admin.js';

class Frame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
        }
    }

    scrollTo(section) {
        setTimeout(() => window.scrollTo({
            top: document.getElementById(section).getBoundingClientRect().top,
              behavior: 'smooth',
          }), 5);
        this.closeMenu();
    } 

    closeMenu() {
        const menuClasses = document.querySelector('.o-header').classList;
        
        if (menuClasses.contains('o-header__open')) {
            menuClasses.remove('o-header__open');
        }
    }

    toggleMenu() {
        document.querySelector('.o-header').classList.toggle('o-header__open');
    }

    render () {
        return (
            <HashRouter>
                <div>
                    <div className="o-header">
                        <button className="o-header__trigger" onClick={this.toggleMenu}><span></span></button>
                        <a className="o-header__item" href="#/" onClick={() => this.scrollTo('section-home')} >Home</a>                        
                        <a className="o-header__item" href="#" onClick={() => this.scrollTo('section-apps')} >Apps</a>
                        {/* <NavLink className="o-header__item" to="/autoflirt">Autoflirt</NavLink>                        
                        <NavLink className="o-header__item" to="/about">About me </NavLink> */}
                        <a className="o-header__item" onClick={this.closeMenu} href="#/privacyPolicy">Privacy Policy</a>
                        { !isLoggedIn() &&
                            <a className="o-header__item" onClick={this.closeMenu} href="#/login">Login</a>
                        }
                        { isLoggedIn() &&
                            <a
                                className="o-header__item"
                                onClick={() => {
                                    logout();
                                    this.closeMenu();
                                }}
                                href="#/"
                            >Logout</a>
                        }
                    </div>
                    <div className="o-header__content">
                        <Route exact path="/" component={Home} />
                        {/* <Route path="/autoflirt" component={Autoflirt} />
                        <Route path="/about" component={About} /> */}
                        <Route path="/privacyPolicy" component={PrivacyPolicy} />
                        <Route path="/login" component={Login} />
                        <Route path="/admin" component={Admin} />
                    </div>
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default Frame;