import React, { Component } from 'react';
import generate from '../../autoflirt';
import Symmetry from './symmetry';
import Footer from '../footer';
import windows from '../../assets/windows.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/default.css';
import '../../css/app.css';

class Home extends Component {

    state = {
        flirt: '',
    }

    componentDidMount() {
        document.title = 'Pontek.se - Home';
        this.setState({flirt: generate()});
    }



    render() {
        return (
            <div>
                <div className="row">
                    <div className="offset-md-3 col-md-6 text-center">
                        <Symmetry/>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-5 col-md-2 text-center">
                        <a href="downloads/Symmetry Screensaver.scr">
                            <img src={windows} alt="Download for Windows" />
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-3 col-md-6 text-center">
                        <a href="downloads/Symmetry Screensaver.scr">
                            {'Download '} 
                        </a>
                        this screensaver free for Windows or 
                        <a href="https://play.google.com/store/apps/details?id=pontus.symmetry&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                        {' download '}</a> 
                        this live wallpaper for Android!
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="offset-md-2 col-md-3 text-center">
                        <a href="https://play.google.com/store/apps/details?id=pontus.wearsnake">
                            <img className="banner" alt="Download for Android" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                    </div>
                    <div className="offset-md-2 col-md-3 text-center">
                        <a href="https://play.google.com/store/apps/details?id=korv.ragga">
                            <img className="banner" alt="Download for Android" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-2 col-md-3 text-center">
                        <a href="https://play.google.com/store/apps/details?id=pontus.wearsnake">
                            {'Download '}
                        </a> 
                        my minimalistic Snake game for Android Wear and phone!
                    </div>
                    <div className="offset-md-2 col-md-3 text-center">
                        <a href="https://play.google.com/store/apps/details?id=korv.ragga">
                            {'Ladda ned '}
                        </a>
                        min fantastiska raggningsreplikgenerator för Android!
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
