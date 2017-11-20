/**
 * @file
 */

import React from 'react';
import { render } from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

let store = configureStore();

render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
