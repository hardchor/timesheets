import '../shared/promisify';
import { app, ipcMain } from 'electron';
import jsonStorage from 'electron-json-storage';
import createMainWindow from './window/createMainWindow';
import configureStore from '../shared/store/configureStore';

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
  const state = await jsonStorage.getAsync('state');
  const store = configureStore(state, 'main');

  store.subscribe(async () => {
    // persist store changes
    // TODO: should this be blocking / wait?
    await jsonStorage.setAsync('state', store.getState());
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
      doCreateMainWindow(store);
    }
  });

  doCreateMainWindow(store);
}

app.on('ready', start);
