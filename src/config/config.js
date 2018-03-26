export const baseUrl = 'http://localhost/dylan';
const lang = '/gbr/en/';
export const formattedURL = (url) => `${baseUrl}${lang}${url}?_format=json`;
export const formattedLocalURL = (url) => `${lang}${url}?_format=json`;
export const baseApi = `https://learn-54603.firebaseio.com/`;
export const apiEndpoints = {
  courses: `${baseApi}/courses.json`,
  modules: `${baseApi}/modules.json`,
  components: `${baseApi}/components.json`,
};

export const apiLogin = formattedLocalURL('user/login');
export const apiLogout = formattedLocalURL('user/logout');
export const apiStatus = formattedLocalURL('user/login_status');

