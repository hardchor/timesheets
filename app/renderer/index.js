import 'babel-polyfill';
import { ipcRenderer, remote } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from '../shared/store/configureStore';
import './app.global.css';

const { initialState } = remote.getCurrentWindow();

const store = configureStore(initialState, 'renderer');
const history = syncHistoryWithStore(hashHistory, store);

ipcRenderer.on('redux-action', (event, payload) => {
  store.dispatch(payload);
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
