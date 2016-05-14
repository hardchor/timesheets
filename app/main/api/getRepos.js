import fetch from 'node-fetch';
import { status, json } from '../../shared/helpers/fetch';

export default function getRepos(accessToken) {
  return fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
  .then(status)
  .then(json);
}
