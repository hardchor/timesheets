import fetchPaginated from '../../shared/helpers/fetchPaginated';
import { iterator, status, json, jsonAggregator } from '../../shared/helpers/fetch';

export default function getRepos(accessToken) {
  return fetchPaginated('https://api.github.com/user/repos?sort=updated', {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
  .then(iterator(status))
  .then(iterator(json))
  .then(jsonAggregator);
}
