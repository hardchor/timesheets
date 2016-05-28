import { BrowserWindow } from 'electron';
import path from 'path';
import process from 'process';
import Positioner from 'electron-positioner';

const menuBarHtml = path.join(__dirname, '../renderer/assets/html/menubar.html');

export default function createMenuBar(trayBounds) {
  const window = new BrowserWindow({
    width: 338,
    height: 600,
    frame: false,
    show: false,
  });

  window.loadURL(`file://${menuBarHtml}`);

  window.webContents.on('did-finish-load', () => {
    // Default the window to the right if `trayPos` bounds are undefined or null.
    const windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
    const positioner = new Positioner(window);
    const { x, y } = positioner.calculate(windowPosition, trayBounds);

    window.setPosition(x, y);
    window.show();
    window.focus();
  });

  window.on('blur', () => {
    window.hide();
  });

  return window;
}
