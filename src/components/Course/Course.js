/**
 * Course
 * -----
 * Takes an ID for one course,
 * Lists all the Module titles
 * And lessons and tests within
 */
import React from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';

const TitleElement = ({title}) => {
  return (
    <h1>{title} Course</h1>
  );
};

const CourseModuleElement = ({title, id, moduleComponents}) => {
  return (
    <div className="module">
      <h2>{title} Module</h2>
      <div>
        <ul>
          {
            moduleComponents.map((moduleComponent, i) => 
              <ModuleComponentElement key={i} title={moduleComponent.field_headline} />
            )
          }
        </ul>
        {
          <Link to={`/module/${id}`}>Go to module</Link>
        }
      </div>
    </div>
  );
};

const ModuleComponentElement = ({title}) => {
  if (!title) {
    return <li>Test</li>;
  }
  return (
    <li>
      { title }
    </li>
  );
};

export const Course = ({ state, route }) => {
  if (!state.loaded) {
    return 'Loading...';
  }
  const courseId = route.match.params.courseId;
  const courseData = state.courses[courseId];
  if (!courseData) {
    return <div>Can't find course [invalid course ID]</div>;
  }
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
              id={moduleId}
              moduleComponents={
                state.modules[moduleId].field_lesson.map(
                  lessonId => state.moduleComponents[lessonId]
                )
              }
            />
          )
        }
      </div>
      <Link to={`/assessment/${courseId}`}>Go to Assessment</Link>
    </Page>
  );
};
