/* eslint-disable no-param-reassign */
import { AUTHENTICATE_GITHUB, GET_GITHUB_REPOS } from '../actions/github';

const initialState = {
  repos: [],
};

export default function github(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case AUTHENTICATE_GITHUB:
      if (action.error) return state;

      return {
        ...state,
        accessToken: payload.access_token,
        tokenType: payload.token_type,
        scope: payload.scope.split(','),
      };

    case GET_GITHUB_REPOS:
      if (action.error) return state;

      return {
        ...state,
        repos: action.payload.map(({ full_name }) => ({
          fullName: full_name,
        })),
      };

    default:
      return state;
  }
}
