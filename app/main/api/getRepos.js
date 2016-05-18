import fetch from 'node-fetch';
import parseLinkHeader from 'parse-link-header';
import { status, json } from '../../shared/helpers/fetch';


async function fetchPaginated(url, options) {
  const response = await fetch(url, options);
  const { next } = parseLinkHeader(response.headers.get('link'));
  let nextResponse = [];
  if (next && next.url) {
    nextResponse = await fetchPaginated(next.url, options);
  }

  return [response, ...nextResponse];
}

const iterator = middleware => responses => Promise.all(
  responses.map(response => middleware(response))
);

function jsonAggregator(responses) {
  const aggregated = [].concat(...responses);

  return aggregated;
}

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
