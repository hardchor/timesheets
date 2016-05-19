import '../shared/promisify';
import path from 'path';
import { app, ipcMain, Tray } from 'electron';
import jsonStorage from 'electron-json-storage';
import createMainWindow from './window/createMainWindow';
import createMenuBarWindow from './window/createMenuBarWindow';
import configureStore from '../shared/store/configureStore';

const trayIcon = path.join(__dirname, '../renderer/assets/images/logo.png');

// we have to do this to allow remote-loading of the current state :()
global.state = {};

let mainWindow = null;
let menuBarWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

function doCreateMainWindow() {
  mainWindow = createMainWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function doCreateMenuBarWindow(bounds) {
  menuBarWindow = createMenuBarWindow(bounds);

  menuBarWindow.on('closed', () => {
    menuBarWindow = null;
  });

  menuBarWindow.on('blur', () => {
    menuBarWindow.close();
  });
}

async function start() {
  // set-up menu bar
  const appIcon = new Tray(trayIcon);
  appIcon.setToolTip('Timesheets');

  global.state = await jsonStorage.getAsync('state');
  const store = configureStore(global.state, 'main');

  store.subscribe(async () => {
    global.state = store.getState();
    // persist store changes
    // TODO: should this be blocking / wait? _.throttle?
    await jsonStorage.setAsync('state', global.state);
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
    if (mainWindow === null) {
      doCreateMainWindow();
    }
  });

  appIcon.on('click', (event, bounds) => {
    doCreateMenuBarWindow(bounds);
  });

  // init
  doCreateMainWindow();
}

app.on('ready', start);
