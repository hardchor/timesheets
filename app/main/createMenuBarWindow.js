import { BrowserWindow } from 'electron';
import path from 'path';
import process from 'process';
import Positioner from 'electron-positioner';

const menuBarHtml = path.join(__dirname, '../renderer/assets/html/menubar.html');

let browserWindow = null;

export default function createMenuBar(trayBounds) {
  if (browserWindow !== null) {
    if (!browserWindow.webContents.isLoading()) {
      browserWindow.show();
      browserWindow.focus();
    }
    return browserWindow;
  }

  browserWindow = new BrowserWindow({
    show: false,
    width: 338,
    height: 600,
    frame: false,
  });

  browserWindow.loadURL(`file://${menuBarHtml}`);

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.webContents.on('did-finish-load', () => {
    // Default the window to the right if `trayPos` bounds are undefined or null.
    const windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
    const positioner = new Positioner(browserWindow);
    const { x, y } = positioner.calculate(windowPosition, trayBounds);

    browserWindow.setPosition(x, y);
    browserWindow.show();
    browserWindow.focus();
  });

  browserWindow.on('blur', () => {
    browserWindow.hide();
  });

  return browserWindow;
}
