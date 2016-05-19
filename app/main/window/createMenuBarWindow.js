import { BrowserWindow } from 'electron';
import path from 'path';

const menuBarHtml = path.join(__dirname, '../../renderer/menubar/index.html');

export default function createMenuBar() {
  const menuBarWindow = new BrowserWindow({
    useContentSize: true,
    // width: 338,
    // height: 600,
    frame: false,
    show: false,
  });

  menuBarWindow.loadURL(`file://${menuBarHtml}`);

  menuBarWindow.webContents.on('did-finish-load', () => {
    menuBarWindow.show();
    menuBarWindow.focus();
  });

  if (process.env.NODE_ENV === 'development') {
    menuBarWindow.openDevTools();
  }

  menuBarWindow.on('blur', () => {
    menuBarWindow.hide();
  });

  return menuBarWindow;
}
