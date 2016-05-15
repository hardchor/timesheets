import githubAuth from '../../main/window/githubAuth';
import getRepos from '../../main/api/getRepos';

// Authenticate
export const REQUEST_AUTHENTICATE_GITHUB = 'REQUEST_AUTHENTICATE_GITHUB';
export const AUTHENTICATE_GITHUB = 'AUTHENTICATE_GITHUB';

export function requestAuthenticateGithub() {
  return {
    type: REQUEST_AUTHENTICATE_GITHUB,
    meta: {
      trigger: AUTHENTICATE_GITHUB,
    },
  };
}
export function authenticateGithub() {
  return {
    type: AUTHENTICATE_GITHUB,
    payload: githubAuth(),
  };
}


// Get repos
export const REQUEST_GET_GITHUB_REPOS = 'REQUEST_GET_GITHUB_REPOS';
export const GET_GITHUB_REPOS = 'GET_GITHUB_REPOS';
export const TRACK_GITHUB_REPO = 'TRACK_GITHUB_REPO';

export function requestGetGithubRepos(accessToken) {
  return {
    type: REQUEST_GET_GITHUB_REPOS,
    payload: [accessToken],
    meta: {
      trigger: GET_GITHUB_REPOS,
    },
  };
}
export function getGithubRepos(accessToken) {
  return {
    type: GET_GITHUB_REPOS,
    payload: getRepos(accessToken),
  };
}
export function trackGithubRepo(id) {
  return {
    type: TRACK_GITHUB_REPO,
    payload: {
      id,
    },
  };
}
