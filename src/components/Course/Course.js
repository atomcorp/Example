/**
 * Course
 * -----
 * Takes an ID for one course,
 * Lists all the Module titles
 * And lessons and tests within
 */
import React from 'react';
import Page from '../../containers/page/page.js';

const TitleElement = ({title}) => {
  return (
    <h1>{title} Course</h1>
  );
};

const CourseModuleElement = ({title, moduleComponents}) => {
  return (
    <div className="module">
      <h2>{title} Module</h2>
      <div>
        <ul>
          {
            moduleComponents.map((moduleComponent, i) => 
              <ModuleLessonElement key={i} title={moduleComponent.field_headline} />
            )
          }
        </ul>
      </div>
    </div>
  );
};

const ModuleLessonElement = ({title}) => {
  if (!title) {
    return <li>Test</li>;
  }
  return (
    <li>
      { title }
    </li>
  );
};

export const Course = ({ state, courseId }) => {
  if (!state.loaded) {
    return 'Loading...';
  }
  const courseData = state.courses[courseId];
  return (
    <Page>
      <TitleElement title={courseData.title} />
      <div dangerouslySetInnerHTML={{
        __html: courseData.field_introduction
      }} />
      <div>
        {
          courseData.modules.map((moduleId, i) => 
            <CourseModuleElement 
              key={i} 
              title={state.modules[moduleId].title}
              moduleComponents={
                state.modules[moduleId].field_lesson.map(
                  lessonId => state.moduleComponents[lessonId]
                )
              }
            />
          )
        }
      </div>
    </Page>
  );
};
