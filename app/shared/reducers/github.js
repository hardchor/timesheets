/* eslint-disable no-param-reassign */
import { AUTHENTICATE_GITHUB, GET_GITHUB_REPOS, TRACK_GITHUB_REPO } from '../actions/github';

const initialState = {
  repos: [],
  trackedRepos: [],
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
        repos: action.payload.map(({ id, full_name }) => ({
          id,
          fullName: full_name,
        })),
      };

    case TRACK_GITHUB_REPO: {
      // check if already tracked
      const trackedRepos = state.trackedRepos || [];
      const tracked = trackedRepos.filter(repo => repo.id === action.payload.id);

      if (tracked.length) return state;

      return {
        ...state,
        trackedRepos: [
          ...trackedRepos,
          {
            id: action.payload.id,
          },
        ],
      };
    }

    default:
      return state;
  }
}
