import { ALIASED } from '.';
import githubAuth from '../../main/window/githubAuth';
import getRepos from '../../main/api/getRepos';

export const aliases = {};

// Authenticate
export const AUTHENTICATE_GITHUB = 'AUTHENTICATE_GITHUB';

export function requestAuthenticateGithub() {
  return {
    type: ALIASED,
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
aliases[AUTHENTICATE_GITHUB] = authenticateGithub;


// Get repos
export const GET_GITHUB_REPOS = 'GET_GITHUB_REPOS';
export const TRACK_GITHUB_REPO = 'TRACK_GITHUB_REPO';
export const UNTRACK_GITHUB_REPO = 'UNTRACK_GITHUB_REPO';

export function requestGetGithubRepos(accessToken) {
  return {
    type: ALIASED,
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
aliases[GET_GITHUB_REPOS] = getGithubRepos;

export function trackGithubRepo(id) {
  return {
    type: TRACK_GITHUB_REPO,
    payload: {
      id,
    },
  };
}
export function untrackGithubRepo(id) {
  return {
    type: UNTRACK_GITHUB_REPO,
    payload: {
      id,
    },
  };
}
