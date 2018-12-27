import React from 'react';
import ReactDOM from 'react-dom';
import * as css from './css';

import Frame from './components/organisms/frame.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Frame />, document.getElementById('root'));
registerServiceWorker();
