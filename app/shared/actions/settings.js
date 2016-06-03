export const SET_REMINDERS_ENABLED = 'SET_REMINDERS_ENABLED';
export const SET_POMODORO_ENABLED = 'SET_POMODORO_ENABLED';
export const SET_GITHUB_ENABLED = 'SET_GITHUB_ENABLED';


export function setRemindersEnabled(flag) {
  return {
    type: SET_REMINDERS_ENABLED,
    payload: flag,
  };
}

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
