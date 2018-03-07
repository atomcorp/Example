// @flow
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';

import type {
  ResourcesType,
  ModuleComponentType,
  MultiChoiceFieldsType,
  LessonFieldsType,
  CourseFieldsType
} from '../../types.js';

const TitleElement = ({ title }: { title: string }): Node => {
  return (
    <h1>{title} Course</h1>
  );
};

type CourseModuleElementType = {
  title: string,
  id: string,
  moduleComponents: Array<ModuleComponentType | {}>
};


const CourseModuleElement = ({ title, id, moduleComponents }: CourseModuleElementType): Node => {
  return (
    <div className="module">
      <h2>{title} Module</h2>
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
          <Link to={`/module/${id}`}>Take the {title} module</Link>
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
  courseId: string
};

export const CourseModulesPresentation = ({
  courseData,
  resources
}: CourseModulesPresentationType
): Node => {
  return (
    courseData.modules.map((moduleId: string, i: number): Node =>
      <CourseModuleElement
        key={i}
        title={resources.modules[moduleId].title}
        id={moduleId}
        moduleComponents={
          resources.modules[moduleId].field_lesson.map(
            (lessonId: string): {} | ModuleComponentType =>
              resources.moduleComponents[lessonId]
          )
        } />
    )
  )
};
