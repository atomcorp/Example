export const baseUrl = 'http://localhost/dylan';
export const baseApi = `https://learn-54603.firebaseio.com/`;
export const apiEndpoints = {
  assessments: `${baseApi}/assessments.json`,
  courses: `${baseApi}/courses.json`,
  modules: `${baseApi}/modules.json`,
  moduleComponents: `${baseApi}/moduleComponents.json`,
};
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
