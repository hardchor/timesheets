/* eslint-disable max-len */
import os from 'os';
import { autoUpdater } from 'electron';
import pkg from '../../package.json';
import {
  checkingForUpdate,
  updateAvailable,
  updateDownloaded,
  updateError,
  updateNotAvailable,
} from '../../shared/actions/system';

const UPDATE_SERVER_HOST = 'timesheets-app.herokuapp.com';

export default function init(store) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (os.platform() !== 'darwin') {
    return;
  }

  const { version } = pkg;

  autoUpdater.addListener('checking-for-update', () => {
    store.dispatch(checkingForUpdate());
  });
  autoUpdater.addListener('update-available', () => {
    store.dispatch(updateAvailable());
  });
  autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    store.dispatch(updateDownloaded(releaseNotes, releaseName, releaseDate, updateURL));
  });
  autoUpdater.addListener('error', (error) => {
    store.dispatch(updateError(error));
  });
  autoUpdater.addListener('update-not-available', () => {
    store.dispatch(updateNotAvailable());
  });

  store.dispatch(checkingForUpdate());

  autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/${version}`);
  autoUpdater.checkForUpdates();
}
