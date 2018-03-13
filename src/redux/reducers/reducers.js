// @flow
import {combineReducers} from 'redux';
import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
} from '../actions/action-types.js';
import {
  CourseType,
  SetCourseStatusReturnType,
  ModuleDoneType,
  AssessmentDoneType,
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
  action: {action: string, id: string}
): ModuleDoneType => {
  switch (action.type) {
    case MODULE_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

export const assessmentStatuses = (
  state: AssessmentStatusesType = {},
  action: {type: string, id: string}
): AssessmentDoneType => {
  switch (action.type) {
    case ASSESSMENT_DONE:
      return Object.assign({}, state, {
        [action.id]: true,
      });
    default:
      return state;
  }
};

const learnApp = combineReducers({
  coursesStatuses,
  moduleProgression,
  assessmentStatuses,
});

export default learnApp;
