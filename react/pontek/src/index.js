import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Frame from './components/frame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Frame />, document.getElementById('root'));
registerServiceWorker();
