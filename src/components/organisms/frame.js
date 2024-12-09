import React, { Component } from 'react';
import Footer from './footer.js';
import history from '../../util/history';
import { Route, Router } from 'react-router-dom';
import { checkLogin, logout, hasToken } from "../../util/auth";

import Home from '../pages/home.js';
import Login from '../pages/login.js';
import Admin from '../pages/admin.js';
import Surveillance from '../pages/surveillance';
import CatHunter from '../pages/catHunter';
import Cameras from '../pages/cameras.js';

const securedPaths = ['/admin', '/surveillance', '/robotpi'];

class Frame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            isLoggedIn: false,
        }
    }

    componentDidMount() {
        history.listen(history => {
            if (securedPaths.includes(history.pathname)) {
                checkLogin().then(isLoggedIn => this.setState({ isLoggedIn }));
            }
        });
        this.setState({ isLoggedIn: hasToken() });

        if (hasToken()) {
            checkLogin().then(isLoggedIn => this.setState({ isLoggedIn }));
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

    render() {
        const { isLoggedIn, token } = this.state;

        return (
            <Router history={history}>
                <div>
                    <div className="o-header">
                        <button className="o-header__trigger" onClick={this.toggleMenu}><span></span></button>
                        <a className="o-header__item" href="/" onClick={() => this.scrollTo('section-home')} >Home</a>
                        {isLoggedIn && <a className="o-header__item" onClick={this.closeMenu} href="/admin">Admin</a>}
                        {isLoggedIn && <a className="o-header__item" onClick={this.closeMenu} href="/cameras">Cameras</a>}
                        {isLoggedIn && <a className="o-header__item" onClick={this.closeMenu} href="/cathunter">KattJäger</a>}
                        {!isLoggedIn &&
                            <a className="o-header__item" onClick={this.closeMenu} href="/login">Login</a>
                        }
                        {isLoggedIn &&
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
                        <Route path="/login" component={Login} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/cameras" component={Cameras} />
                        <Route path="/cathunter" component={CatHunter} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Frame;