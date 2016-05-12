import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import job from './job';

export default function getRootReducer(scope = 'main') {
  let reducers = {
    job,
  };

  if (scope === 'renderer') {
    reducers = {
      ...reducers,
      routing,
    };
  }
  return combineReducers({ ...reducers });
}
