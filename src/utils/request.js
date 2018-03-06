import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {}
  })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .catch(err => ({err}));
}
