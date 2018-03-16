import {createStore} from 'redux';
import learnApp from '../reducers/reducers.js';

// this is really the user data
const initialState = {
  coursesStatuses: {},
  moduleProgression: {},
  assessmentStatuses: {},
};

export const store = createStore(learnApp, initialState);
