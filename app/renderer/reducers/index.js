import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import job from './job';

const rootReducer = combineReducers({
  routing,
  job,
});

export default rootReducer;
