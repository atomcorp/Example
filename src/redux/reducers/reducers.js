// @flow
import {combineReducers} from 'redux';
import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
  LOGIN,
  LOGOUT,
} from '../actions/action-types.js';
import type {
  CourseType,
  SetCourseStatusReturnType,
  ModuleType,
  AssessmentStatusesType,
} from '../../types.js';
/**
 * Shows whether a Course has been:W
 * not-started, started, completed
 * TODO: should not regress, eg !(completed -> started)
 */

export const coursesStatuses = (
  state: CourseType = {},
  action: SetCourseStatusReturnType
): CourseType => {
  switch (action.type) {
    case SET_COURSE_STATUS:
      return Object.assign({}, state, {
        [action.course]: action.status,
      });
    default:
      return state;
  }
};

// When a user finishes a Module, gets marks as done
// and shows on Course pages
export const moduleProgression = (
  state: ModuleType = {},
  action: {action: string, id: string, type: string}
): ModuleType => {
  switch (action.type) {
    case MODULE_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

// Checks if User has completed an Assessment
export const assessmentStatuses = (
  state: AssessmentStatusesType = {},
  action: {type: string, id: string}
): AssessmentStatusesType => {
  switch (action.type) {
    case ASSESSMENT_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

type UserStatusType = {
  id: string,
  isLoggedIn: boolean
};

export const status = (
  state: UserStatusType = {
    error: '',
    isLoggedIn: false,
    email: '',
    id: '',
  },
  action: {type: string, id?: string, email?: string}
): UserStatusType => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return Object.assign({}, state, {
        id: '',
        isLoggedIn: false,
        email: '',
        error: '',
      });
    case LOGIN.FAILURE:
      return Object.assign({}, state, {
        id: '',
        isLoggedIn: false,
        email: '',
        error: action.error,
      });
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        isLoggedIn: true,
        email: action.email,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        error: '',
        isLoggedIn: false,
        email: '',
        id: '',
      });
    default:
      return state;
  }
};

const learnApp = combineReducers({
  coursesStatuses,
  moduleProgression,
  assessmentStatuses,
  status,
});

export default learnApp;
