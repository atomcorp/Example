// @flow
import React from 'react';
import type { Node } from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';
// import type { CourseType } from '../../types.js';

type CourseButtonType = {
  title: string,
  nid: string
};

const CourseButton = ({ title, nid }: CourseButtonType): Node => {
  return (
    <li>
      <h2><Link to={`/course/${nid}`}>{title}</Link></h2>
    </li>
  );
};

type CoursesType = {
  [nid: string]: {
    "assessment": Array<string>,
    "field_introduction": string,
    "modules": Array<string>,
    "nid": string,
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
