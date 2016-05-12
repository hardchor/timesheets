import { ipcMain, BrowserWindow } from 'electron';

const forwardToRenderer = store => next => action => {
  // remove scope to avoid endless-loop
  const rendererAction = Object.assign({}, action, {
    meta: {
      scope: 'renderer'
    },
  });

  const openWindows = BrowserWindow.getAllWindows();
  openWindows.forEach(({ webContents }) => {
    webContents.send('redux-action', rendererAction);
  });

  // ipcMain.send('redux-action', rendererAction);
  return next(action);
};

export default forwardToRenderer;
