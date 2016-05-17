import fetch from 'node-fetch';
import { status, json } from '../../shared/helpers/fetch';

export default function importProjects(accessToken, repoFullName) {
  return fetch(`https://api.github.com/repos/${repoFullName}/issues?state=all`, {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
  .then(status)
  .then(json);
}
