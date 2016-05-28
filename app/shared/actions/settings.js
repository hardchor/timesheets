export const SET_POMODORO = 'SET_POMODORO';


export function setPomodoro(flag) {
  return {
    type: SET_POMODORO,
    payload: flag,
  };
}
