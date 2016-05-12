import { app, ipcMain } from 'electron';
import createMainWindow from './createMainWindow';
import configureStore from '../shared/store/configureStore';

const store = configureStore(undefined, 'main');
let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

function doCreateMainWindow() {
  mainWindow = createMainWindow(store);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


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

app.on('ready', doCreateMainWindow);
