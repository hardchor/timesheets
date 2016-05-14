import { BrowserWindow } from 'electron';
import url from 'url';
import config from '../../config';
import requestGithubToken from '../api/requestGithubToken';

const { clientId, scopes } = config.github;

let authWindow;

export default function githubAuth() {
  const githubUrl = 'https://github.com/login/oauth/authorize';
  const authUrl = `${githubUrl}?client_id=${clientId}&scope=${scopes}`;

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
      const { query } = url.parse(newUrl, true);
      const { code, error } = query;

      if (code || error) {
        // Close the browser if code found or error
        authWindow.destroy();
      }

      // If there is a code, proceed to get token from github
      if (code) {
        requestGithubToken(code)
          .then(resolve);
      } else if (error) {
        reject('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.');
      }
    }

    // Handle the response from GitHub

    authWindow.webContents.on('will-navigate', (event, newUrl) => {
      handleCallback(newUrl);
    });

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleCallback(newUrl);
    });
  });
}
