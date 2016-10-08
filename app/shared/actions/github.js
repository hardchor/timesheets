import githubAuth from '../../main/api/requestGithubToken';
import getRepos from '../../main/api/getRepos';
import importProjects from '../../main/api/importProjects';
import getIssuesForUser from '../../main/api/getIssuesForUser';
import { createAliasedAction } from '../../../packages/electron-redux';

// Authenticate
export const AUTHENTICATE_GITHUB = 'AUTHENTICATE_GITHUB';

export const authenticateGithub = createAliasedAction(
  AUTHENTICATE_GITHUB,
  (username, password, twofa) => ({
    type: AUTHENTICATE_GITHUB,
    payload: githubAuth(username, password, twofa),
    meta: {
      username,
    },
  })
);

// Get repos
export const GET_GITHUB_REPOS = 'GET_GITHUB_REPOS';
export const TRACK_GITHUB_REPO = 'TRACK_GITHUB_REPO';
export const UNTRACK_GITHUB_REPO = 'UNTRACK_GITHUB_REPO';

export const getGithubRepos = createAliasedAction(
  GET_GITHUB_REPOS,
  (accessToken) => ({
    type: GET_GITHUB_REPOS,
    payload: getRepos(accessToken),
  })
);

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

export const importGithubProjects = createAliasedAction(
  IMPORT_GITHUB_PROJECTS,
  (accessToken, repoFullName) => ({
    type: IMPORT_GITHUB_PROJECTS,
    payload: importProjects(accessToken, repoFullName),
  })
);


// Get recent issues assigned to user
export const GET_GITHUB_ISSUES_ASSIGNED_TO_USER = 'GET_GITHUB_ISSUES_ASSIGNED_TO_USER';

export function getGithubIssuesAssignedToUser(accessToken) {
  return {
    type: GET_GITHUB_ISSUES_ASSIGNED_TO_USER,
    payload: getIssuesForUser(accessToken),
  };
}
