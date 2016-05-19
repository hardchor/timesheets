import { BrowserWindow } from 'electron';
import path from 'path';

const menuBarHtml = path.join(__dirname, '../../renderer/menubar/index.html');

export default function createMenuBar() {
  const menuBarWindow = new BrowserWindow({
    useContentSize: true,
    frame: false,
  });

  menuBarWindow.loadURL(`file://${menuBarHtml}`);

  menuBarWindow.on('blur', () => {
    menuBarWindow.hide();
  });

  return menuBarWindow;
}
