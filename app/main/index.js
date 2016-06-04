import os from 'os';
import { app, ipcMain, dialog } from 'electron';
import pify from 'pify';
import jsonStorage from 'electron-json-storage';
import createMainWindow from './createMainWindow';
import createMenuBarWindow from './createMenuBarWindow';
import configureStore from '../shared/store/configureStore';
import tray from './tray';
import osxAutoUpdater from './tasks/osxAutoUpdater';
import reminder from './tasks/reminder';

// we have to do this to ease remote-loading of the initial state :(
global.state = {};

const storage = pify(jsonStorage);

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


async function start() {
  // set-up menu bar
  const appIcon = tray();

  global.state = await storage.get('state');
  const store = configureStore(global.state, 'main');

  store.subscribe(async () => {
    global.state = store.getState();
    // persist store changes
    // TODO: should this be blocking / wait? _.throttle?
    await storage.set('state', global.state);
  });

  ipcMain.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createMainWindow();
  });

  appIcon.on('click', (event, bounds) => {
    createMenuBarWindow(bounds);
  });

  // init
  createMainWindow();

  // auto-updating
  setTimeout(() => {
    if (process.env.NODE_ENV === 'production') {
      if (os.platform() === 'darwin') {
        osxAutoUpdater(store);
      }
    }
  }, 5000);

  reminder(store);
}

app.on('ready', () => {
  start()
  .catch((err) => {
    dialog.showErrorBox('There\'s been an error', err.message);
  });
});
