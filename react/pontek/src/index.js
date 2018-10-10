import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/symmetry.css';
import './css/footer.css';
import './css/header.css';
import './css/home.css';
import './css/global.css';

import Frame from './components/frame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Frame />, document.getElementById('root'));
registerServiceWorker();
