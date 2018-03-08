import { combineReducers } from 'redux';
import {
  CourseStatuses,
  SET_COURSE_STATUS
} from '../actions/action-types.js';

export const coursesStatuses = (state = {}, action) => {
  switch (action.type) {
    case SET_COURSE_STATUS:
      return Object.assign({}, state, {
        [action.course]: action.status
      });
    default:
      return state;
  }
};

export const learnApp = combineReducers({
  coursesStatuses
});



