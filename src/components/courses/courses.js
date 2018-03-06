// @flow
import React from 'react';
import type { Node } from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';
import type { CourseType } from '../../types.js';

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

export const Courses = ({ courses }: CourseType): Node => {
  return (
    <Page>
      <h1>Courses</h1>
      <ul>
        {
          Object.keys(courses).map((key: string, index: number): Array<Node> => {
            return <CourseButton key={index} id={courses[key].nid} title={courses[key].title} />
          })
        }
      </ul>
    </Page>
  );
};
