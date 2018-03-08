import { createStore } from 'redux';
import { learnApp } from '../reducers/reducers.js';
import { CourseStatuses } from '../actions/action-types.js';

const initialStore = {
  courseStatuses: {
    'edge': CourseStatuses.NOT_STARTED
  }
};

let store = createStore(learnApp, initialStore);