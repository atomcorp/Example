import {
  SET_COURSE_STATUS,
  MODULE_DONE
} from './action-types.js';

export const setCourseStatus = ({status, course}) => {
  return {
    type: SET_COURSE_STATUS,
    status,
    course
  }
};

export const moduleDone = (id) => {
  return {
    type: MODULE_DONE,
    id
  }
};