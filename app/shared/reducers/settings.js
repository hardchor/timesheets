/* eslint-disable no-param-reassign */
import {
  SET_POMODORO,
} from '../actions/settings';

const initialState = {
  pomodoro: false,
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_POMODORO: {
      return {
        ...state,
        pomodoro: action.payload,
      };
    }

    default:
      return state;
  }
}
