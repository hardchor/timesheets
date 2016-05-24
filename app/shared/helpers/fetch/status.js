function handleError(response) {
  const twofa = response.headers._headers['x-github-otp'];
  const tokenExists = response.status === 422;

  const err = new Error(response.statusText);
  if (twofa) err.twofa = true;
  if (tokenExists) err.tokenExists = true;
  err.response = response;

  throw err;
}

/**
 * Handles non-200 statuses
 * @param  {Object} response
 * @return {Object} response
 * @throws {Error} on non-200 status
 */
export default function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  handleError(response);
}
