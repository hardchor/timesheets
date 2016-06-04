import path from 'path';
import { Tray } from 'electron';

const trayIcon = path.join(__dirname, '../renderer/assets/images/logo.png');
let appIcon = null;

export default function create() {
  if (appIcon !== null) return appIcon;

  appIcon = new Tray(trayIcon);
  appIcon.setToolTip('Timesheets');

  return appIcon;
}
