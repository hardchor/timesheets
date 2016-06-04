export const CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE';
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_NOT_AVAILABLE = 'UPDATE_NOT_AVAILABLE';
export const SHOW_MENUBAR_WINDOW = 'SHOW_MENUBAR_WINDOW';


export function checkingForUpdate() {
  return {
    type: CHECKING_FOR_UPDATE,
  };
}

export function updateAvailable() {
  return {
    type: UPDATE_AVAILABLE,
  };
}

export function updateDownloaded(releaseNotes, releaseName, releaseDate, updateURL) {
  return {
    type: UPDATE_DOWNLOADED,
    payload: {
      releaseNotes,
      releaseName,
      releaseDate,
      updateURL,
    },
  };
}

export function updateError(error) {
  return {
    type: UPDATE_ERROR,
    error: true,
    payload: error.message,
  };
}

export function updateNotAvailable() {
  return {
    type: UPDATE_NOT_AVAILABLE,
  };
}

export function showMenubarWindow(path = '/') {
  return {
    type: SHOW_MENUBAR_WINDOW,
    payload: path,
  };
}
