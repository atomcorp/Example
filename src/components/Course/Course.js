// @flow
/**
 * Course
 * -----
 * Takes an ID for one course,
 * Lists all the Module titles
 * And lessons and tests within
 */
import React from 'react';
import type { Node } from 'react';
import Page from '../../containers/page/page.js';
import { Link } from 'react-router-dom';
import {
  CoursePresentation,
  CourseModulesPresentation
} from './CoursePresentation.js';
import type { ResourcesType } from '../../types.js'; 

type CourseType = {
  resources: ResourcesType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  },
  moduleStatuses: {
    [id: string]: boolean
  },
  coursesStatuses: {
    [id: string]: string
  },
  updateCourseStatus: (string, string) => void
};

export const Course = ({ resources, route, moduleStatuses, coursesStatuses, updateCourseStatus }: CourseType): Node => {
  const courseId = route.match.params.courseId;
  const courseData = resources.courses[courseId];
  if (!courseData) {
    return <div>Can not find course [invalid course ID]</div>;
  }
  // TODO: Remove the onClick from Courses?
  if (coursesStatuses[courseId] === 'NOT_STARTED') {
    updateCourseStatus('STARTED', courseId);
  }
  return (
    <Page>
      <CoursePresentation {...courseData} />
      <CourseModulesPresentation courseData={courseData} resources={resources} />
      <Link to={`/course/${courseId}/assessment`}>Go to Assessment</Link>
    </Page>
  );
};
