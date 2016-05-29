export const SET_POMODORO_ENABLED = 'SET_POMODORO_ENABLED';


export function setPomodoroEnabled(flag) {
  return {
    type: SET_POMODORO_ENABLED,
    payload: flag,
  };
}
