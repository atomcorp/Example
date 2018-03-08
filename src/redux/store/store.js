import { createStore } from 'redux';
import { learnApp } from '../reducers/reducers.js';
import { CourseStatuses } from '../actions/action-types.js';

const initialStore = {
  coursesStatuses: {
    'edge': CourseStatuses.NOT_STARTED
  }
};

export const store = createStore(learnApp, initialStore);