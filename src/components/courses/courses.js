import React from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';

const CourseButton = ({ title, id }) => {
  return (
    <div>
      <Link to={`/course/${id}`}>{title}</Link>
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
