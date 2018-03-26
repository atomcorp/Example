// @flow
import React from 'react';
import type {Node} from 'react';
import {Link} from 'react-router-dom';

import type {
  ResourcesType,
  ModuleComponentType,
  MultiChoiceFieldsType,
  LessonFieldsType,
  CourseFieldsType,
  ModuleStatusesType,
} from '../../types.js';

const TitleElement = ({title}: { title: string }): Node => {
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
  moduleStatus,
}: CourseModuleElementType): Node => (
  <div className="module">
    <h2>{title} Module ({moduleStatus ? 'COMPLETE' : 'NOT COMPLETE'})</h2>
    <div>
      <ul>
        {

          moduleComponents.map((
            moduleComponent: MultiChoiceFieldsType | LessonFieldsType | {},
            i: number
          ): Node =>
            {

              return <ModuleComponentElement key={i} {...moduleComponent} />
            }
          )
        }
      </ul>
      {
        <Link to={`/course/${courseId}/${moduleId}`}>
          <button>Take the {title} module</button>
        </Link>
      }
    </div>
  </div>
);

const ModuleComponentElement = ({
  field_headline,
}: { field_headline: string | void }): Node => {
  if (!field_headline) {
    return <li>Test</li>;
  }
  return (
    <li>
      {field_headline[0].value}
    </li>
  );
};

type CoursePresentationType = {
  title: string,
  field_introduction: string
};

export const CoursePresentation = ({
  title,
  field_introduction,
}: CoursePresentationType): Node => (
  <div>
    <TitleElement title={title[0].value} />
    <div dangerouslySetInnerHTML={{
      __html: field_introduction[0].value,
    }} />
  </div>
);

type CourseModulesPresentationType = {
  courseData: CourseFieldsType,
  resources: ResourcesType,
  moduleStatuses: ModuleStatusesType
};

export const CourseModulesPresentation = ({
  courseData,
  resources,
  moduleStatuses,
}: CourseModulesPresentationType
): Node => (
  courseData.field_modules.map((module: string, i: number): Node =>
    {
      return <CourseModuleElement
        key={i}
        title={resources.modules[module.target_id].title[0].value}
        moduleId={module.target_id}
        courseId={courseData.nid[0].value}
        moduleStatus={moduleStatuses[module.target_id]}
        moduleComponents={
          resources.modules[module.target_id].field_add_components.map(
            (component: string): {} | ModuleComponentType =>
              resources.components[component.target_id]
          )
        } />;
    }
  )
);

type CourseAssessmentType = {
  courseId: string,
  completed: boolean,
  courseTitle: string
};

export const CourseAssessment = ({
  courseId,
  completed,
  courseTitle,
}: CourseAssessmentType): Node => (
  <div>
    <h2>{courseTitle} Assessment {
        completed ? '(COMPLETED)' : '(NOT COMPLETED)'
    }</h2>
    <Link to={`/course/${courseId}/assessment`}>
      <button>Take the Assessment</button>
    </Link>
    <br/>
  </div>
);
