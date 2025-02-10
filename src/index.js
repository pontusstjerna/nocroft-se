import React, { StrictMode } from 'react';
import * as css from './css';
import { createRoot } from 'react-dom/client';
import Frame from './components/organisms/frame.js';

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<StrictMode><Frame /></StrictMode>)
