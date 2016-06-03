/* eslint-disable no-param-reassign */
import {
  SET_REMINDERS_ENABLED,
  SET_REMINDERS_FROM_TIME,
  SET_REMINDERS_TO_TIME,
  SET_REMINDERS_WEEKDAYS,
  SET_POMODORO_ENABLED,
  SET_GITHUB_ENABLED,
} from '../actions/settings';

const initialState = {
  remindersEnabled: true,
  remindersFromTime: '09:00',
  remindersToTime: '17:00',
  remindersWeekdays: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: false,
    7: false,
  },
  pomodoroEnabled: false,
  githubEnabled: true,
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_REMINDERS_ENABLED: {
      return {
        ...state,
        remindersEnabled: !!action.payload,
      };
    }

    case SET_REMINDERS_FROM_TIME: {
      return {
        ...state,
        remindersFromTime: action.payload,
      };
    }

    case SET_REMINDERS_TO_TIME: {
      return {
        ...state,
        remindersToTime: action.payload,
      };
    }

    case SET_REMINDERS_WEEKDAYS: {
      return {
        ...state,
        remindersWeekdays: action.payload,
      };
    }

    case SET_POMODORO_ENABLED: {
      return {
        ...state,
        pomodoroEnabled: !!action.payload,
      };
    }

    case SET_GITHUB_ENABLED: {
      return {
        ...state,
        githubEnabled: !!action.payload,
      };
    }

    default:
      return state;
  }
}
