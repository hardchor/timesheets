import githubAuth from '../../main/window/githubAuth';

export const REQUEST_AUTHENTICATE_GITHUB = 'REQUEST_AUTHENTICATE_GITHUB';
export const AUTHENTICATE_GITHUB = 'AUTHENTICATE_GITHUB';

export function requestAuthenticateGithub() {
  return {
    type: REQUEST_AUTHENTICATE_GITHUB,
    meta: {
      scope: 'main',
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
