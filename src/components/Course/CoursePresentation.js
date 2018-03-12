// @flow
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';

import type {
  ResourcesType,
  ModuleComponentType,
  MultiChoiceFieldsType,
  LessonFieldsType,
  CourseFieldsType,
  ModuleStatusesType
} from '../../types.js';

const TitleElement = ({ title }: { title: string }): Node => {
  return (
    <h1>{title} Course</h1>
  );
};

type CourseModuleElementType = {
  title: string,
  moduleId: string,
  courseId: string,
  moduleComponents: Array<ModuleComponentType | {}>,
  moduleStatus: boolean
};

const CourseModuleElement = ({ 
  title, 
  courseId, 
  moduleId, 
  moduleComponents,
  moduleStatus 
}: CourseModuleElementType): Node => {
  return (
    <div className="module">
      <h2>{title} Module ({moduleStatus ? 'COMPLETE' : 'NOT COMPLETE'})</h2>
      <div>
        <ul>
          {

            moduleComponents.map((
              moduleComponent: MultiChoiceFieldsType | LessonFieldsType | {}, 
              i: number
            ): Node =>
              <ModuleComponentElement key={i} {...moduleComponent} />
            )
          }
        </ul>
        {
          <Link to={`/course/${courseId}/${moduleId}`}>Take the {title} module</Link>
        }
      </div>
    </div>
  );
};

const ModuleComponentElement = ({ field_headline }: { field_headline: string | void }): Node => {
  if (!field_headline) {
    return <li>Test</li>;
  }
  return (
    <li>
      {field_headline}
    </li>
  );
};

type CoursePresentationType = {
  title: string,
  field_introduction: string
};

export const CoursePresentation = (
  {
    title,
    field_introduction
  }: CoursePresentationType): Node => {
  return (
    <div>
      <TitleElement title={title} />
      <div dangerouslySetInnerHTML={{
        __html: field_introduction
      }} />
    </div>
  )
};

type CourseModulesPresentationType = {
  courseData: CourseFieldsType,
  resources: ResourcesType,
  moduleStatuses: ModuleStatusesType
};

export const CourseModulesPresentation = ({
  courseData,
  resources,
  moduleStatuses
}: CourseModulesPresentationType
): Node => {
  return (
    courseData.modules.map((moduleId: string, i: number): Node =>
      <CourseModuleElement
        key={i}
        title={resources.modules[moduleId].title}
        moduleId={moduleId}
        courseId={courseData.id}
        moduleStatus={moduleStatuses[moduleId]}
        moduleComponents={
          resources.modules[moduleId].field_lesson.map(
            (lessonId: string): {} | ModuleComponentType =>
              resources.moduleComponents[lessonId]
          )
        } />
    )
  )
};

type CourseAssessmentType = {
  courseId: string, 
  completed: boolean,
  courseTitle: string
};

export const CourseAssessment = ({
  courseId, 
  completed,
  courseTitle
}: CourseAssessmentType): Node => (
  <div>
    <h2>{courseTitle} Assessment</h2>
    <Link to={`/course/${courseId}/assessment`}>
      <button>Take the Assessment</button>
    </Link>
    <br/>
    {
      completed ? '(Completed)' : '(Not completed)'
    }
  </div>
);
  