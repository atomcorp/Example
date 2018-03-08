import {
  SET_COURSE_STATUS
} from './action-types.js';

export const setCourseStatus = ({status, course}) => {
  return {
    type: SET_COURSE_STATUS,
    status,
    course
  }
};