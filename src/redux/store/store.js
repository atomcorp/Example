import { createStore } from 'redux';
import learnApp from '../reducers/reducers.js';

const initialState = {
  coursesStatuses: {},
  moduleProgression: {},
  assessmentStatuses: {}
};

export const store = createStore(learnApp, initialState);