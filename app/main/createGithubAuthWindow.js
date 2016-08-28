import { BrowserWindow } from 'electron';
import url from 'url';
import config from '../config';

const { authUrl, tokenUrl, resultUrl } = config.github;
const tokenUrlRegex = RegExp(`^${tokenUrl}`);
const resultUrlRegex = RegExp(`^${resultUrl}`);

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
      if (tokenUrlRegex.test(newUrl)) authWindow.hide();
      if (!resultUrlRegex.test(newUrl)) return;

      authWindow.close();

      const { query } = url.parse(newUrl, true);
      const { access_token: accessToken, scope, token_type: tokenType, error } = query;

      if (accessToken) {
        resolve({ accessToken, scope, tokenType });
      } else {
        reject(error || 'No access token or error');
      }
    }


    authWindow.webContents.on('will-navigate', (event, newUrl) => {
      setImmediate(() => handleCallback(newUrl));
    });

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      setImmediate(() => handleCallback(newUrl));
    });
  });
}
