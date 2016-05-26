/* eslint-disable no-param-reassign */
import {
  CHECKING_FOR_UPDATE,
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOADED,
  UPDATE_ERROR,
  UPDATE_NOT_AVAILABLE,
 } from '../actions/system';

const initialState = {
  checkingForUpdate: false,
  updateAvailable: false,
  updateDownloaded: false,
  release: {},
  updateError: false,
  updateNotAvailable: false,
};

export default function system(state = initialState, action) {
  switch (action.type) {
    case CHECKING_FOR_UPDATE: {
      return {
        ...state,
        ...initialState,
        checkingForUpdate: true,
      };
    }

    case UPDATE_AVAILABLE: {
      return {
        ...state,
        ...initialState,
        updateAvailable: true,
      };
    }

    case UPDATE_DOWNLOADED: {
      const { releaseNotes, releaseName, releaseDate, updateURL } = action.payload;
      return {
        ...state,
        ...initialState,
        updateDownloaded: true,
        release: {
          releaseNotes,
          releaseName,
          releaseDate,
          updateURL,
        },
      };
    }

    case UPDATE_ERROR: {
      return {
        ...state,
        ...initialState,
        updateError: action.payload,
      };
    }

    case UPDATE_NOT_AVAILABLE: {
      return {
        ...state,
        ...initialState,
        updateNotAvailable: true,
      };
    }

    default:
      return state;
  }
}
