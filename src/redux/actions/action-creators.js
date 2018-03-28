// @flow
import {
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
  CHOOSE_LANGUAGE,
} from './action-types.js';
import type {
  SetCourseStatusType,
  SetCourseStatusReturnType,
  ModuleDoneType,
  AssessmentDoneType,
} from '../../types.js';

export const setCourseStatus = ({
  status,
  course,
}: SetCourseStatusType): SetCourseStatusReturnType => ({
  type: SET_COURSE_STATUS,
  status,
  course,
});

export const moduleDone = (id: string): ModuleDoneType => ({
  type: MODULE_DONE,
  id,
});

export const assessmentDone = (id: string): AssessmentDoneType => ({
  type: ASSESSMENT_DONE,
  id,
});

export const chooseLanguage = (
  language: string
): {type: string, language: string} => ({
  type: CHOOSE_LANGUAGE,
  language,
});
