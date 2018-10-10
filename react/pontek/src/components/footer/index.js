import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import github from '../../assets/GitHub-Mark-Light-32px.png';
import youtube from '../../assets/YouTube-social-icon_red_24px.png';
import twitter from '../../assets/TwitterLogo_white.png';
import '../../css/default.css';
import '../../css/footer.css';

class Footer extends Component {

    render () {
        return (
            <div className="footer">
                <div className="row icons">
                    <div className="offset-md-3 col-md-6 text-center">
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
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <a href="/legacy/privacyPolicy.html" className="sidenote">
                            Privacy policy for Android apps
                        </a>
                    </div>
                </div>
                <footer>
                    <p className="copyright" align="center">&copy; Copyright 2018 by Pontus.</p>
                </footer>
            </div>
        );
    }
}

export default Footer;
