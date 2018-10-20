import React, { Component } from 'react';
import Symmetry from '../molecules/symmetry';

import windows from '../../assets/windows.svg';


class Apps extends Component {

    render() {
        return (
            <div id="section-apps" className="o-apps u-container">
                <div className="u-row">
                    <div className="o-apps__app">
                        <a href="downloads/Symmetry Screensaver.scr">
                            <img className="o-apps__icon" src={windows} alt="Download for Windows" />
                        </a>
                        <span>
                            <a href="downloads/Symmetry Screensaver.scr">
                                    {'Download '} 
                            </a>
                            the Symmetry screensaver free for Windows or 
                            <a href="https://play.google.com/store/apps/details?id=pontus.symmetry&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                {' download '}
                            </a> 
                            this live wallpaper for Android!
                        </span>
                    </div>
                </div>
                <div className="u-row">
                    <div className="o-apps__app">
                        <a href="https://play.google.com/store/apps/details?id=pontus.wearsnake">
                            <img className="o-apps__icon" alt="Download for Android" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                        <span>
                            <a href="https://play.google.com/store/apps/details?id=pontus.wearsnake">
                                {'Download '}
                            </a> 
                            my minimalistic Snake game for Android Wear and phone!
                        </span>
                    </div>
                    <div className="o-apps__app">
                        <a href="https://play.google.com/store/apps/details?id=korv.ragga">
                            <img className="o-apps__icon" alt="Download for Android" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" />
                        </a>
                        <span>
                            <a href="https://play.google.com/store/apps/details?id=korv.ragga">
                                {'Ladda ned '}
                            </a>
                            min fantastiska raggningsreplikgenerator för Android!
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Apps;