import { BrowserWindow } from 'electron';
import path from 'path';
import process from 'process';
import Positioner from 'electron-positioner';

const menuBarHtml = path.join(__dirname, '../renderer/assets/html/menubar.html');

let browserWindow = null;
let cachedTrayBounds;

function positionWindow() {
  let windowPosition = 'topRight';
  if (cachedTrayBounds) {
    windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
  }
  const positioner = new Positioner(browserWindow);
  const { x, y } = positioner.calculate(windowPosition, cachedTrayBounds);

  browserWindow.setPosition(x, y);
}

function showWindow() {
  browserWindow.show();
  browserWindow.focus();
}

export default function createMenuBar({ trayBounds, uri = '/' } = {}) {
  if (trayBounds) cachedTrayBounds = trayBounds;

  if (browserWindow !== null) {
    positionWindow();
    if (!browserWindow.webContents.isLoading()) {
      showWindow();
    }
    return browserWindow;
  }

  browserWindow = new BrowserWindow({
    show: false,
    width: 338,
    height: 600,
    frame: false,
  });

  browserWindow.loadURL(`file://${menuBarHtml}#${uri}`);

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.webContents.on('did-finish-load', () => {
    positionWindow();
    showWindow();
  });

  browserWindow.on('blur', () => {
    browserWindow.hide();
  });

  return browserWindow;
}
