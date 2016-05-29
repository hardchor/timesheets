/* eslint-disable no-param-reassign */
import {
  SET_POMODORO_ENABLED,
} from '../actions/settings';

const initialState = {
  pomodoroEnabled: false,
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_POMODORO_ENABLED: {
      return {
        ...state,
        pomodoroEnabled: action.payload,
      };
    }

    default:
      return state;
  }
}
