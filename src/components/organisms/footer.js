import React, { Component } from 'react';
import github from '../../assets/GitHub-Mark-Light-32px.png';
import youtube from '../../assets/YouTube-social-icon_red_24px.png';
import twitter from '../../assets/TwitterLogo_white.png';
class Footer extends Component {

    render () {
        return (
            <footer className="o-footer u-container">
                <div className="">
                    <a href="http://www.github.com/pontusstjerna">
                        <img  alt="See my GitHub" src={github} />
                    </a>
                    <a href="https://se.linkedin.com/pub/pontus-stjernstr%C3%B6m/106/aa9/403">
                        <img alt="See my LinkedIn profile" src="https://static.licdn.com/scds/common/u/img/webpromo/btn_in_20x15.png"/>
                    </a>
                    <a href="https://soundcloud.com/pontusstjernstr-m">
                        <img alt="See my SoundCloud" src="https://developers.soundcloud.com/assets/logo_white-af5006050dd9cba09b0c48be04feac57.png" />
                    </a>
                    <a href="https://www.youtube.com/user/korvblaster">
                        <img alt="See my YouTube" src={youtube} />
                    </a>
                    <a href="https://twitter.com/pontustjerna">
                        <img className="twitter" alt="See my Twitter" src={twitter} />
                    </a>
                </div>
                <p className="o-footer__copy" align="center">&copy; Copyright {new Date().getFullYear()} by Pontus.</p>
            </footer>
        );
    }
}

export default Footer;
