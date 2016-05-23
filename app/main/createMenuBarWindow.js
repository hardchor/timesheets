import { BrowserWindow } from 'electron';
import path from 'path';
import process from 'process';
import Positioner from 'electron-positioner';

const menuBarHtml = path.join(__dirname, '../renderer/assets/html/menubar.html');

export default function createMenuBar(trayBounds) {
  const menuBarWindow = new BrowserWindow({
    width: 338,
    height: 600,
    frame: false,
    show: false,
  });

  menuBarWindow.loadURL(`file://${menuBarHtml}`);

  menuBarWindow.webContents.on('did-finish-load', () => {
    // Default the window to the right if `trayPos` bounds are undefined or null.
    const windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
    const positioner = new Positioner(menuBarWindow);
    const { x, y } = positioner.calculate(windowPosition, trayBounds);

    menuBarWindow.setPosition(x, y);
    menuBarWindow.show();
    menuBarWindow.focus();
  });

  menuBarWindow.on('blur', () => {
    menuBarWindow.hide();
  });

  return menuBarWindow;
}
