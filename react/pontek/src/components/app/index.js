import React, { Component } from 'react';
import Symmetry from './symmetry';
import windows from '../../assets/windows.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/default.css';
import '../../css/app.css';

class App extends Component {

    render() {
        
        return (
            <div>
                <div className="row">
                    <div className="offset-md-4 col-md-4 text-center">
                        <Symmetry ref={svg => svg.animate()}/>
                        <h1>Under construction!</h1>
                        <p className="Text">
                            This will later be the new version of Pontek.se.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-5 col-md-2 text-center">
                        <a href="downloads/Symmetry Screensaver.scr">
                            <img src={windows} />
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
                <div className="row">
                    <div className="offset-md-3 col-md-2 text-center">
                        <a href="https://play.google.com/store/apps/details?id=pontus.wearsnake">
                            <img className="banner" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                    </div>
                    <div className="offset-md-2 col-md-2 text-center">
                    <a href="https://play.google.com/store/apps/details?id=korv.ragga&hl=sv&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                            <img className="banner" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
