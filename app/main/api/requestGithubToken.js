import fetch from 'node-fetch';
import config from '../../config';
import { status, text, json } from '../../shared/helpers/fetch';

export default function requestGithubToken(username, password, twofactor) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      scopes: config.github.scopes,
      note: 'Timesheets App',
    }),
  };


  if (twofactor) {
    options.headers['X-GitHub-OTP'] = twofactor;
  }

  return fetch('https://api.github.com/authorizations', options)
  .then(status)
  .then(json);
}
