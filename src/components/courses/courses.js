// @flow
import React from 'react';
import type { Node } from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';
// import type { CourseType } from '../../types.js';

type CourseButtonType = {
  title: string,
  id: string
};

const CourseButton = ({ title, id }: CourseButtonType): Node => {
  return (
    <li>
      <h2><Link to={`/course/${id}`}>{title}</Link></h2>
    </li>
  );
};

type CoursesType = {
  [id: string]: {
    "assessment": Array<string>,
    "field_introduction": string,
    "modules": Array<string>,
    "id": string,
    "title": string
  }
};

export const Courses = ({courses}: {courses: CoursesType}): Node => {
  return (
    <Page>
      <h1>Courses</h1>
      <ul>
        {
          Object.keys(courses).map((key: string, index: number): Node => {
            return <CourseButton key={index} {...courses[key]} />
          })
        }
      </ul>
    </Page>
  );
};
