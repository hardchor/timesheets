import '../shared/init';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { getInitialStateRenderer } from 'electron-redux';
import configureStore from '../../shared/store/configureStore';
import routes from './routes';

const initialState = getInitialStateRenderer();

const store = configureStore(initialState, 'renderer');
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
