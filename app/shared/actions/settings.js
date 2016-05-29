export const SET_POMODORO_ENABLED = 'SET_POMODORO_ENABLED';
export const SET_GITHUB_ENABLED = 'SET_GITHUB_ENABLED';


export function setPomodoroEnabled(flag) {
  return {
    type: SET_POMODORO_ENABLED,
    payload: flag,
  };
}

export function setGithubEnabled(flag) {
  return {
    type: SET_GITHUB_ENABLED,
    payload: flag,
  };
}
