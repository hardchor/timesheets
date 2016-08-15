import fetch from 'node-fetch';
import { status, json } from '../../shared/helpers/fetch';

export default function getIssuesForUser(accessToken) {
  return fetch('https://api.github.com/issues?filter=assigned&sort=updated', {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
  .then(status)
  .then(json);
}
