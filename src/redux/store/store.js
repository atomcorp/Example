import {createStore} from 'redux';
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
  },
};

export const store = createStore(learnApp, initialState);
