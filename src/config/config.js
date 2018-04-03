export const baseUrl = 'http://localhost/dylan';
const lang = '/gbr/en/';
export const formattedURL = (url) => `${baseUrl}${lang}${url}?_format=json`;
export const formattedLocalURL = (url) => `${lang}${url}?_format=json`;
export const baseApi = `https://www.cambridgeaudio.com/gbr/`;
// export const apiEndpoints = {
//   courses: `${baseApi}/courses.json`,
//   modules: `${baseApi}/modules.json`,
//   components: `${baseApi}/components.json`,
// };

const apiEndpoints = (baseApi) => {
  return (lang = '') => {
    return {
      courses: `${baseApi}${lang}/api/learning/courses?_format=json`,
      modules: `${baseApi}${lang}/api/learning/modules?_format=json`,
      components: `${baseApi}${lang}/api/learning/components?_format=json`,
    };
  };
};

export const localisedApiEndpoints = apiEndpoints(baseApi);
export const localisedCertificateEndpoint = (lang) =>
  `${baseApi}${lang}/api/learning/certificate?_format=json`;

export const apiLogin = formattedLocalURL('user/login');
export const apiLogout = formattedLocalURL('user/logout');
export const apiStatus = formattedLocalURL('user/login_status');

