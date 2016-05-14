/* eslint-disable no-param-reassign */
import { AUTHENTICATE_GITHUB } from '../actions/github';

const initialState = {
};

export default function github(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case AUTHENTICATE_GITHUB:
      return Object.assign({}, state, {
        accessToken: payload.access_token,
        tokenType: payload.token_type,
        scope: payload.scope.split(','),
      });

    default:
      return state;
  }
}
