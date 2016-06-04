import { app, BrowserWindow, Menu, shell } from 'electron';
import path from 'path';

const mainHtml = path.join(__dirname, '../renderer/assets/html/main.html');

let browserWindow = null;

export default function createWindow({ uri = '/' } = {}) {
  if (browserWindow !== null) {
    if (!browserWindow.webContents.isLoading()) {
      browserWindow.show();
      browserWindow.focus();
    }
    return browserWindow;
  }

  let menu;
  let template;

  browserWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  });

  function handleRedirect(e, url) {
    if (url !== browserWindow.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  }

  browserWindow.maximize();

  browserWindow.loadURL(`file://${mainHtml}#${uri}`);

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.webContents.on('did-finish-load', () => {
    browserWindow.show();
    browserWindow.focus();
  });
  browserWindow.webContents.on('will-navigate', handleRedirect);
  browserWindow.webContents.on('new-window', handleRedirect);

  if (process.env.NODE_ENV === 'development') {
    browserWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About Timesheets',
        selector: 'orderFrontStandardAboutPanel:',
      }, {
        type: 'separator',
      }, {
        label: 'Services',
        submenu: [],
      }, {
        type: 'separator',
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:',
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:',
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:',
      }, {
        type: 'separator',
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        },
      }],
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:',
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:',
      }, {
        type: 'separator',
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:',
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:',
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:',
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:',
      }],
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          browserWindow.webContents.reload();
        },
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          browserWindow.setFullScreen(!browserWindow.isFullScreen());
        },
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          browserWindow.toggleDevTools();
        },
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          browserWindow.setFullScreen(!browserWindow.isFullScreen());
        },
      }],
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:',
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:',
      }, {
        type: 'separator',
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:',
      }],
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        },
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        },
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        },
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        },
      }],
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O',
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          browserWindow.close();
        },
      }],
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          browserWindow.webContents.reload();
        },
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          browserWindow.setFullScreen(!browserWindow.isFullScreen());
        },
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          browserWindow.toggleDevTools();
        },
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          browserWindow.setFullScreen(!browserWindow.isFullScreen());
        },
      }],
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        },
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        },
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        },
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        },
      }],
    }];
    menu = Menu.buildFromTemplate(template);
    browserWindow.setMenu(menu);
  }

  return browserWindow;
}
