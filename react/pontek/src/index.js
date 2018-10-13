import React from 'react';
import ReactDOM from 'react-dom';
import * as css from './css';

import Frame from './components/frame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Frame />, document.getElementById('root'));
registerServiceWorker();
