import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import getRootReducer from '../reducers';
import forwardToMain from './middleware/forwardToMain';
import forwardToRenderer from './middleware/forwardToRenderer';
import DevTools from '../../renderer/containers/DevTools';

export default function configureStore(initialState, scope = 'main') {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  const router = routerMiddleware(hashHistory);

  let middleware = [
    thunk,
    logger,
  ];

  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      router,
      ...middleware,
    ];
  }
  if (scope === 'main') {
    middleware = [
      ...middleware,
      forwardToRenderer,
    ];
  }

  let enhanced = [
    applyMiddleware(...middleware),
  ];

  if (scope === 'renderer') {
    enhanced = [
      ...enhanced,
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      ),
    ];
  }

  const rootReducer = getRootReducer(scope);
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
