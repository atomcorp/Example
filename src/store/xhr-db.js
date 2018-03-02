/**
 * Get all the data for the app in one go
 */
import {
  apiEndpoints
} from '../config/config.js';

const fetchEndpoint = (url, key) => {
  return fetch(url).then(res => res.json()).then(json => {
    return {
      [key]: json
    }
  });
};

export const fetchEverything = () => {
  return Promise.all(
    Object.keys(apiEndpoints).map(key => fetchEndpoint(apiEndpoints[key], key))
  );
};
