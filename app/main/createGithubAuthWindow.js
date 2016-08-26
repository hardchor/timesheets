import { BrowserWindow } from 'electron';
import config from '../config';

const { scopes, authUrl, tokenUrl } = config.github;

let authWindow;

export default function createGithubAuthWindow() {
  // Build the OAuth consent page URL
  authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    'node-integration': false,
  });
  authWindow.loadURL(authUrl);
  authWindow.show();

  // Reset the authWindow on close
  authWindow.on('close', () => {
    authWindow = null;
  }, false);

  // TODO: move below to own module
  return new Promise((resolve, reject) => {
    function handleCallback(newUrl) {
      // const { query } = url.parse(newUrl, true);
      // const { code, error } = query;
      console.log('##### redirect', newUrl);
      // TODO: parse body for {access_token, scope, token_type}

      // if (code || error) {
      //   // Close the browser if code found or error
      //   authWindow.close();
      // }

      resolve('123code');
      // if (code) {
        // TODO: resolve with code
      // } else if (error) {
      //   reject('Oops! Something went wrong and we couldn\'t' +
      //   'log you in using Github. Please try again.');
      // }
    }

    // Handle the response from GitHub

    authWindow.webContents.on('will-navigate', (event, newUrl) => {
      setImmediate(() => handleCallback(newUrl));
    });

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      setImmediate(() => handleCallback(newUrl));
    });
  });
}
