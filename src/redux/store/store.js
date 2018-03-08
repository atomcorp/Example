import { createStore } from 'redux';
import { learnApp, coursesStatuses } from '../reducers/reducers.js';

import {
  SET_COURSE_STATUS,
  CourseStatuses
} from '../actions/action-types.js';
import { setCourseStatus } from '../actions/action-creators.js';

const initialStore = {
  courseStatuses: {
    'edge': CourseStatuses.NOT_STARTED
  }
};

let store = createStore(learnApp, initialStore);

console.log(store.getState());
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
store.dispatch(coursesStatuses({
  status: CourseStatuses.STARTED,
  course: 'edge'
}));
store.dispatch(coursesStatuses({
  status: CourseStatuses.COMPLETED,
  course: 'edge'
}));
unsubscribe();