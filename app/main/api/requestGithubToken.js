import querystring from 'querystring';
import fetch from 'node-fetch';
import FormData from 'form-data';
import config from '../../config';
import { status, text } from '../../shared/helpers/fetch';

const { clientId, clientSecret } = config.github;

export default async function requestGithubToken(code) {
  const form = new FormData();
  form.append('client_id', clientId);
  form.append('client_secret', clientSecret);
  form.append('code', code);

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: form,
  })
  .then(status)
  .then(text)
  .then(response => querystring.parse(response));
}
