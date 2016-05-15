import { BrowserWindow } from 'electron';

const forwardToRenderer = store => next => action => {
  // change scope to avoid endless-loop
  const rendererAction = Object.assign({}, action, {
    meta: {
      scope: 'local',
    },
  });

  const openWindows = BrowserWindow.getAllWindows();
  openWindows.forEach(({ webContents }) => {
    webContents.send('redux-action', rendererAction);
  });

  return next(action);
};

export default forwardToRenderer;
