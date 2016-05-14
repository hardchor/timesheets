/**
 * Handles non-200 statuses
 * @param  {Object} response
 * @return {Object} response
 * @throws {Error} on non-200 status
 */
export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const err = new Error(response.statusText);
  err.response = response;

  throw err;
}

export function json(response) {
  return response.json();
}

export function text(response) {
  return response.text();
}
