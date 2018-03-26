/**
 * Get all the data for the app in one go
 */
import {
  apiEndpoints,
} from './config/config.js';

const fetchEndpoint = (url, key) => fetch(url).then((res) =>
  res.json()).then((json) => {
    return {
      [key]: json,
    };
  });

const fetchEverything = () => Promise.all(
  Object.keys(apiEndpoints).map((key) => fetchEndpoint(apiEndpoints[key], key))
);

export const resources = fetchEverything().then((res) =>
  res.reduce((acc, val) => Object.assign({}, acc, val), {}));
