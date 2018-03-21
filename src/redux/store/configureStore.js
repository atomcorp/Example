import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/reducers.js';
// import {getUserData} from '../../api.js';

// Example Of Initial State {
//   coursesStatuses: {},
//   moduleProgression: {},
//   assessmentStatuses: {},
//   status: {
//     id: '',
//     isLoggedIn: false,
//     email: '',
//     error: '',
//     isLoggingIn: false,
//   },
// };

// const initialState = firebase.default.currentUser | {};

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default configureStore;
