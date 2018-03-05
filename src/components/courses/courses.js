import React from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';

const CourseButton = ({ title, id }) => {
  return (
    <li>
      <h2><Link to={`/course/${id}`}>{title}</Link></h2>
    </li>
  );
};

export const Courses = ({courses}) => {
  return (
    <Page>
      <h1>Courses</h1>
      <ul>
        {
          Object.keys(courses).map((key, index) => {
            return <CourseButton key={index} id={courses[key].nid} title={courses[key].title} />
          })
        }
      </ul>
    </Page>
  );
};
