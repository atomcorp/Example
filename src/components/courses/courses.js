// @flow
import React from 'react';
import type {Node} from 'react';
import {CourseStatuses} from '../../redux/actions/action-types.js';
import Page from '../../containers/page/page.js';
import {Link} from 'react-router-dom';
import type {StatusType, CourseType} from '../../types.js';
import {Loading} from '../';

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
          : <Link
              to={`/course/${id}`}
              onClick={onClick}>
              {title} ({status})
            </Link>
      }
    </h2>
  );
};

type CourseListType = {
  courses: CourseType,
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
        title={courses[key].title[0].value}
        id={courses[key].nid[0].value}
        status={
          coursesStatuses[key]
          ? coursesStatuses[key]
          : coursesStatuses[key] = CourseStatuses.NOT_STARTED
        }
        onClick={(): void => onClick(
          CourseStatuses.STARTED, courses[key].nid[0].value
        )} />
    )
  );
};

type CoursesType = {
  coursesStatuses: {
    [id: string]: StatusType
  },
  onClick: () => void,
  resources: {
    data: {
      courses: CourseType
    },
    loaded: boolean
  }
};

// coursesStatuses is mapped from state by the CoursesContainer
// gets the latest version
export const Courses = ({
  coursesStatuses,
  onClick,
  resources,
}: CoursesType): Node => {
  if (!resources.loaded) {
    return <Loading text={'Loading courses'} />;
  }
  return (
    <Page title={'Choose a course'}>
      <div>
        <CourseList
          courses={resources.data.courses}
          coursesStatuses={coursesStatuses}
          onClick={onClick} />
      </div>
    </Page>
  );
};

