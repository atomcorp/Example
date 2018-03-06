// @flow

export type MultiChoiceType = { 
  [id: string]: { 
    "field_correct_choice": string, 
    "field_incorrect_choices": Array<string>, 
    "field_question": string, 
    "id": string, 
    "type": 'Multiple-Choice Question' 
  } 
};

export type LessonType = { 
  [id: string]: { 
    "field_body": string, 
    "field_headline": string, 
    "field_youtube_id": string | void, 
    "id": string, 
    "type": 'Lesson' 
  }
};

export type ModuleComponentType = MultiChoiceType | LessonType;

export type CourseType = { 
  [id: string]: { 
    "assessment": Array<string>, 
    "field_introduction": string, 
    "modules": Array<string>, 
    "nid": string, 
    "title": string 
  } 
};

export type ModuleType = {
  [id: string]: { 
    "field_lesson": Array<string>, 
    "nid": string, 
    "title": string
  } 
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