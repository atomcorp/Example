// @flow
import {
  CourseStatuses,
  SET_COURSE_STATUS,
  MODULE_DONE,
  ASSESSMENT_DONE,
} from './redux/actions/action-types.js';

export type MultiChoiceType = {
  [id: string]: MultiChoiceFieldsType
};

export type MultiChoiceFieldsType = {
  "field_correct_choice": string,
  "field_incorrect_choices": Array<string>,
  "field_question": string,
  "id": string,
  "type": 'Multiple-Choice Question'
};

export type LessonType = {
  [id: string]: LessonFieldsType
};

export type LessonFieldsType = {
  "field_body": string,
  "field_headline": string,
  "field_youtube_id": string | void,
  "id": string,
  "type": 'Lesson'
};

export type ModuleComponentType = MultiChoiceType | LessonType;

export type CourseType = {
  [id: string]: CourseFieldsType
};

export type CourseFieldsType = {
  "assessment": Array<string>,
  "field_introduction": string,
  "modules": Array<string>,
  "id": string,
  "title": string
};

export type ModuleType = {
  [id: string]: ModuleFieldsType
};

export type ModuleFieldsType = {
  "field_lesson": Array<string>,
  "id": string,
  "title": string
};

export type ResourcesType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  moduleComponents: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType,
  loaded: boolean
};

export type StateType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  moduleComponents: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType,
  loaded: boolean
};

export type ModuleStateType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  moduleComponents: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType,
  loaded: boolean,
  moduleComponentCount: ?number,
  visibleModuleComponent: ?number,
  nextButtonDisabled: ?boolean
};

export type InitalStateType = {
  state: {
    assessments: {} | MultiChoiceType,
    courses: {} | CourseType,
    moduleComponents: {} | LessonType | MultiChoiceType,
    modules: {} | ModuleType,
    loaded: boolean
  }
};

export type StatusType =
  CourseStatuses.NOT_STARTED
  | CourseStatuses.STARTED
  | CourseStatuses.COMPLETED;

export type ModuleStatusesType = {
  [id: string]: boolean
};

export type CoursesStatusesType = {
  [id: string]: boolean
};

export type AssessmentStatusesType = {
  [id: string]: boolean
};

// Redux Types
export type SetCourseStatusType = {
  status: CourseStatuses.NOT_STARTED
  | CourseStatuses.STARTED
  | CourseStatuses.COMPLETED,
  course: string
};

export type SetCourseStatusReturnType = {
  type: SET_COURSE_STATUS,
  status: StatusType,
  course: string
};

export type ModuleDoneType = {
  type: MODULE_DONE,
  id: string
};

export type AssessmentDoneType = {
  type: ASSESSMENT_DONE,
  id: string
};
