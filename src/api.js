/**
 * Get all the data for the app in one go
 */
import {
  apiEndpoints,
  apiLogin,
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

export const login = ({name, pass}) => (
  fetch(apiLogin, {
    body: JSON.stringify(
      {
        name,
        pass,
      }
    ),
    cache: 'no-cache',
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then((json) => {
    if (json.csrf_token) {
      console.log(json); // eslint-disable-line no-console, no-undef
      return;
    }
    console.error(json.message); // eslint-disable-line no-console, no-undef
  })
  // .catch((err) => console.error(err))
);

// const egUser = {
//   'name': 'tom.maxwell',
//   'pass': '!adminPassword001',
// };
// login(egUser);

// all temporary
// Need to post user data to server
const userId = 'tom';

const localSave = (data) => {
  localStorage.setItem(userId, JSON.stringify(data));
};

const localGet = () => JSON.parse(localStorage.getItem(userId));

const localClear = () => {
  localStorage.removeItem(userId);
};

export const postUserData = (data) => localSave(data);

export const getUserData = () => localGet();

export const clearUserData = () => localClear();
