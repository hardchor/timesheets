import { ALIASED } from '.';
import githubAuth from '../../main/api/requestGithubToken';
import getRepos from '../../main/api/getRepos';
import importProjects from '../../main/api/importProjects';

export const aliases = {};

// Authenticate
export const AUTHENTICATE_GITHUB = 'AUTHENTICATE_GITHUB';

export function requestAuthenticateGithub(username, password, twofa) {
  return {
    type: ALIASED,
    payload: [username, password, twofa],
    meta: {
      trigger: AUTHENTICATE_GITHUB,
    },
  };
}
export function authenticateGithub(username, password, twofa) {
  return {
    type: AUTHENTICATE_GITHUB,
    payload: githubAuth(username, password, twofa),
    meta: {
      username,
    },
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


// Import projects
export const IMPORT_GITHUB_PROJECTS = 'IMPORT_GITHUB_PROJECTS';

export function requestImportGithubProjects(accessToken, repoFullName) {
  return {
    type: ALIASED,
    payload: [accessToken, repoFullName],
    meta: {
      trigger: IMPORT_GITHUB_PROJECTS,
    },
  };
}
export function importGithubProjects(accessToken, repoFullName) {
  return {
    type: IMPORT_GITHUB_PROJECTS,
    payload: importProjects(accessToken, repoFullName),
  };
}
aliases[IMPORT_GITHUB_PROJECTS] = importGithubProjects;
