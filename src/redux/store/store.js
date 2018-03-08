import { createStore } from 'redux';
import { learnApp } from '../reducers/reducers.js';
import { CourseStatuses } from '../actions/action-types.js';

const initialState = {
  coursesStatuses: {
    'edge': CourseStatuses.NOT_STARTED
  },
  moduleProgression: {
    'key-technology': false
  }
};

export const store = createStore(learnApp, initialState);