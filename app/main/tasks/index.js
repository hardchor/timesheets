import os from 'os';
import osxAutoUpdater from './osxAutoUpdater';
import reminder from './reminder';
import updateLastActiveProject from './updateLastActiveProject';

export default function init(store) {
  // auto-updating
  setTimeout(() => {
    if (process.env.NODE_ENV === 'production') {
      if (os.platform() === 'darwin') {
        osxAutoUpdater(store);
      }
    }
  }, 5000);

  reminder(store);
  updateLastActiveProject(store);
}
