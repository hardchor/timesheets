import '../shared/promisify';
import { app, ipcMain } from 'electron';
import jsonStorage from 'electron-json-storage';
import createMainWindow from './window/createMainWindow';
import configureStore from '../shared/store/configureStore';

// we have to do this to allow remote-loading of the current state :()
global.state = {};

let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

function doCreateMainWindow(store) {
  mainWindow = createMainWindow(store);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function start() {
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

  doCreateMainWindow();
}

app.on('ready', start);
