import React from 'react';
import Page from '../../containers/page/page.js';

const CourseButton = ({ title, id }) => {
  return (
    <div data-course-id={id}>
      { title }
    </div>
  );
};

export const Courses = ({courses}) => {
  return (
    <Page>
      <h1>Courses</h1>
      {
        Object.keys(courses).map((key, index) => {
          return <CourseButton key={index} id={courses[key].nid} title={courses[key].title} />
        })
      }
    </Page>
  );
};
