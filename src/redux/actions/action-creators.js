import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE
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

export const assessmentDone = (id) => {
  return {
    type: ASSESSMENT_DONE,
    id
  }
};