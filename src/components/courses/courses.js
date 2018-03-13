// @flow
import React from 'react';
import type {Node} from 'react';
import {CourseStatuses} from '../../redux/actions/action-types.js';
import Page from '../../containers/page/page.js';
import {Link} from 'react-router-dom';
import type {StatusType} from '../../types.js';

type CourseButtonType = {
  title: string,
  id: string,
  status: string,
  onClick: () => void
};

export const CourseButton = ({
  title,
  id,
  status,
  onClick,
}: CourseButtonType): Node => {
  // TODO: sucks, should have a HOF to encapsulate this issue
  // only add onClick if course hasn't been started
  return (
    <h2>
      {
        status !== CourseStatuses.NOT_STARTED
          ? <Link to={`/course/${id}`}>
              {title} ({status})
            </Link>
          : <Link to={`/course/${id}`} onClick={onClick}>
              {title} ({status})
            </Link>
      }
    </h2>
  );
};

type CourseListType = {
  courses: {
    [id: string]: {
      "assessment": Array<string>,
      "field_introduction": string,
      "modules": Array<string>,
      "id": string,
      "title": string
    }
  },
  coursesStatuses: {
    [id: string]: StatusType
  },
  onClick: (string, string) => void
};

const CourseList = ({
  courses,
  coursesStatuses,
  onClick,
}: CourseListType): Array<Node> => {
  return (
    Object.keys(courses).map((key: string, index: number): Node =>
      <CourseButton
        key={index}
        title={courses[key].title}
        id={courses[key].id}
        status={
          coursesStatuses[key]
          ? coursesStatuses[key]
          : coursesStatuses[key] = CourseStatuses.NOT_STARTED
        }
        onClick={(): void => onClick(
          CourseStatuses.STARTED, courses[key].id
        )} />
    )
  );
};

type CoursesType = {
  courses: {
    [id: string]: {
      "assessment": Array<string>,
      "field_introduction": string,
      "modules": Array<string>,
      "id": string,
      "title": string
    }
  },
  coursesStatuses: {
    [id: string]: StatusType
  },
  onClick: () => void
};

// coursesStatuses is mapped from state by the CoursesContainer
// gets the latest version
export const Courses = ({
  courses,
  coursesStatuses,
  onClick,
}: CoursesType): Node => {
  return (
    <Page>
      <h1>Choose a course</h1>
      <div>
        <CourseList
          courses={courses}
          coursesStatuses={coursesStatuses}
          onClick={onClick} />
      </div>
    </Page>
  );
};

