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
  "field_correct_choice": Array<{
    value: string
  }>,
  "field_incorrect_choices": Array<{
    value: string
  }>,
  "field_question": Array<{
    value: string
  }>,
  "id": Array<{
    value: string
  }>,
  "type": Array<{
    target_id: 'question'
  }>
};

export type LessonType = {
  [id: string]: LessonFieldsType
};

export type LessonFieldsType = {
  "field_body": Array<{
    value: string
  }>,
  "field_headline": Array<{
    value: string
  }>,
  "field_youtube_id": Array<{
    value: string
  }> | void,
  "id": Array<{
    value: string
  }>,
  "type": Array<{
    value: 'lesson'
  }>,
  field_image: Array<{
    alt: string,
    url: string
  }>
};

export type ModuleComponentType = MultiChoiceType | LessonType;

export type CourseType = {
  [id: string]: CourseFieldsType
};

export type CourseFieldsType = {
  "field_course_assessment": Array<{
    target_id: string
  }>,
  "field_introduction": Array<{
    value: string
  }>,
  "field_modules": Array<{
    target_id: string
  }>,
  "nid": Array<{
    value: string
  }>,
  "title": Array<{
    value: string
  }>
};

export type ModuleType = {
  [id: string]: ModuleFieldsType
};

export type ModuleFieldsType = {
  "field_add_components": Array<{
    target_id: string
  }>,
  "nid": Array<{
    value: string
  }>,
  "title": Array<{
    value: string
  }>
};

export type ResourcesType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  components: {} | LessonType | MultiChoiceType,
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

export type TranslateType = (string) => string;
