/* eslint-disable max-len */
import os from 'os';
import { app, autoUpdater } from 'electron';
import pkg from '../package.json';

const UPDATE_SERVER_HOST = 'timesheets-app.herokuapp.com';

export default function init(window) {
  console.log('##### autoUpdater', os.platform());
  // if (process.env.NODE_ENV !== 'production') {
  //   return;
  // }

  if (os.platform() !== 'darwin') {
    return;
  }

  // const version = app.getVersion();
  const { version } = pkg;

  autoUpdater.addListener('update-available', (event) => {
    // log('A new update is available');
    console.log('A new update is available');
  });
  autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    // notify('A new update is ready to install', `Version ${releaseName} is downloaded and will be automatically installed on Quit`);
    console.log('A new update is ready to install', `Version ${releaseName} is downloaded and will be automatically installed on Quit`, updateURL);
  });
  autoUpdater.addListener('error', (error) => {
    console.log('##### error', error);
    // log(error);
  });
  autoUpdater.addListener('checking-for-update', (event) => {
    console.log('checking-for-update');
    // log('checking-for-update');
  });
  autoUpdater.addListener('update-not-available', () => {
    console.log('update-not-available');
    // log('update-not-available');
  });
  console.log('##### url', `https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/v${version}`);
  autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${os.platform()}_${os.arch()}/v${version}`);

  // autoUpdater.checkForUpdates();
}
