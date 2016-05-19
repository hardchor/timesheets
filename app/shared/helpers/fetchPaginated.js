import fetch from 'node-fetch';
import parseLinkHeader from 'parse-link-header';

export default async function fetchPaginated(url, options) {
  const response = await fetch(url, options);
  const links = parseLinkHeader(response.headers.get('link') || '');

  let nextResponse = [];
  if (links && links.next && links.next.url) {
    nextResponse = await fetchPaginated(links.next.url, options);
  }

  return [response, ...nextResponse];
}
