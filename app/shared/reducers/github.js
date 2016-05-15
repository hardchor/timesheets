/* eslint-disable no-param-reassign */
import {
  AUTHENTICATE_GITHUB,
  GET_GITHUB_REPOS,
  TRACK_GITHUB_REPO,
  UNTRACK_GITHUB_REPO,
} from '../actions/github';

const initialState = {
  repos: [],
};

function mapRepo({ id, full_name }) {
  return {
    id,
    fullName: full_name,
  };
}

export default function github(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case AUTHENTICATE_GITHUB:
      if (error) return state;

      return {
        ...state,
        accessToken: payload.access_token,
        tokenType: payload.token_type,
        scope: payload.scope.split(','),
      };

    case GET_GITHUB_REPOS: {
      if (error) return state;

      // update existing
      const existingRepos = state.repos
        .map(repo => {
          const found = payload.reduce(
            (previous, current) => (repo.id === current.id ? current : previous),
            false
          );

          if (found) {
            return {
              ...repo,
              ...mapRepo(found),
            };
          }
          return undefined;
        });

      // add new
      const newRepos = payload
        .filter((repo) =>
          !state.repos.reduce((previous, current) => (previous || repo.id === current.id), false)
        )
        .map(mapRepo);

      return {
        ...state,
        repos: [
          ...existingRepos,
          ...newRepos,
        ],
      };
    }

    case TRACK_GITHUB_REPO: {
      const repos = state.repos.map(repo => {
        if (repo.id === action.payload.id) {
          repo.tracked = true;
        }

        return repo;
      });

      return {
        ...state,
        repos,
      };
    }

    case UNTRACK_GITHUB_REPO: {
      const repos = state.repos.map(repo => {
        if (repo.id === action.payload.id) {
          repo.tracked = false;
        }

        return repo;
      });

      return {
        ...state,
        repos,
      };
    }

    default:
      return state;
  }
}
