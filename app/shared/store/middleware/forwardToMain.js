import { ipcRenderer } from 'electron';

const forwardToMain = store => next => action => {
  if (action.meta && action.meta.scope && action.meta.scope === 'main') {
    ipcRenderer.send('redux-action', action);

    // stop action in-flight
    return;
  }

  return next(action);
};

export default forwardToMain;
