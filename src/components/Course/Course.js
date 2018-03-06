// @flow
/**
 * Course
 * -----
 * Takes an ID for one course,
 * Lists all the Module titles
 * And lessons and tests within
 */
import React from 'react';
import type { Node } from 'react';
import type { StateType, ModuleComponentType } from '../../types.js';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';

type CourseModuleElementType = {
  title: string, 
  id: string, 
  moduleComponents: Array<ModuleComponentType | {}>
};

const TitleElement = ({title}: {title: string}): Node => {
  return (
    <h1>{title} Course</h1>
  );
};

const CourseModuleElement = ({ title, id, moduleComponents }: CourseModuleElementType): Node => {
  return (
    <div className="module">
      <h2>{title} Module</h2>
      <div>
        <ul>
          {
            moduleComponents.map((moduleComponent: ModuleComponentType | {}, i: number): Array<Node> => 
              <ModuleComponentElement key={i} title={moduleComponent.field_headline} />
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

const ModuleComponentElement = ({ title }: { title: string }): Node => {
  if (!title) {
    return <li>Test</li>;
  }
  return (
    <li>
      { title }
    </li>
  );
};

type CourseType = {
  state: StateType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  }
};

export const Course = ({ state, route }: CourseType): Node => {
  if (!state.loaded) {
    return 'Loading...';
  }
  const courseId = route.match.params.courseId;
  const courseData = state.courses[courseId];
  if (!courseData) {
    return <div>Can not find course [invalid course ID]</div>;
  }
  return (
    <Page>
      <TitleElement title={courseData.title} />
      <div dangerouslySetInnerHTML={{
        __html: courseData.field_introduction
      }} />
      <div>
        {
          courseData.modules.map((moduleId: string, i: number): Node => 
            <CourseModuleElement 
              key={i}
              title={state.modules[moduleId].title}
              id={moduleId}
              moduleComponents={
                state.modules[moduleId].field_lesson.map(
                  (lessonId: string): Node => state.moduleComponents[lessonId]
                )
              } />
          )
        }
      </div>
      <Link to={`/assessment/${courseId}`}>Go to Assessment</Link>
    </Page>
  );
};
