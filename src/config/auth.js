import Cookies from 'js-cookie';
import {
  apiLogin,
  apiStatus,
} from './config.js';

export const appAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    callback();
  },
  signout(callback) {
    this.isAuthenticated = false;
    callback();
  },
};

export const login = ({name, pass}) => (
  fetch(apiLogin, {
    body: JSON.stringify({
      name,
      pass,
    }),
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

export const setCookie = ({key, value}) => Cookies.set(key, value);
export const getCookie = (key) => Cookies.get(key);

// const egUser = {
//   'name': 'tom.maxwell',
//   'pass': '!adminPassword001',
// };
// login(egUser);

export const logout = () => {};

export const isLoggedIn = () => fetch(apiStatus)
  .then((res) => res.text())
  .then((res) => console.log(res)); // eslint-disable-line no-console, no-undef
// isLoggedIn();
