import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import learnApp from '../reducers/reducers.js';
import {getUserData} from '../../api.js';

// this is really the user data
const initialState = getUserData() || {
  coursesStatuses: {},
  moduleProgression: {},
  assessmentStatuses: {},
  status: {
    id: '',
    isLoggedIn: false,
    email: '',
    error: '',
    isLoggingIn: false,
  },
};

const loggerMiddleware = createLogger();

export const store = createStore(
  learnApp,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
