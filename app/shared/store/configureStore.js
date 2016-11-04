import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
import promise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import getRootReducer from '../reducers';
import DevTools from '../../renderer/main/components/DevTools';

/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */
export default function configureStore(initialState, scope = 'main') {
  const logger = createLogger({
    level: scope === 'main' ? undefined : 'info',
    collapsed: true,
  });
  const router = routerMiddleware(hashHistory);

  let middleware = [
    thunk,
    promise(),
  ];

  if (!process.env.NODE_ENV) {
    // middleware.push(logger);
  }

  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      router,
      ...middleware,
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }

  const enhanced = [
    applyMiddleware(...middleware),
  ];

  if (/*! process.env.NODE_ENV && */scope === 'renderer') {
    enhanced.push(DevTools.instrument());
    enhanced.push(persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    ));
  }

  const rootReducer = getRootReducer(scope);
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  if (!process.env.NODE_ENV && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}
