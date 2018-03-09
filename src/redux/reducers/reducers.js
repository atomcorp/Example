import { combineReducers } from 'redux';
import {
  SET_COURSE_STATUS,
  MODULE_DONE
} from '../actions/action-types.js';

/**
 * Shows whether a Course has been: 
 * not-started, started, completed
 * TODO: should not regress, eg !(completed -> started)
 */

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

/**
 * When a user finishes a Module, gets marks as done
 * and shows on Course pages
 */
export const moduleProgression = (state = {}, action) => {
  switch (action.type) {
    case MODULE_DONE:
      return Object.assign({}, state, {
        [action.id]: true
      })
    default:
      return state;
  }
}

export const learnApp = combineReducers({
  coursesStatuses,
  moduleProgression
});
