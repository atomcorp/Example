import React from 'react';
import Page from '../../containers/page/page.js';

const Course = ({title}) => {
  return (
    <div>
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
          return <Course key={index} title={courses[key].title} />
        })
      }
    </Page>
  );
};
