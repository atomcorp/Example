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
import { store } from '../../redux/store/store.js';
import { setCourseStatus } from '../../redux/actions/action-creators.js';
import { CourseStatuses } from '../../redux/actions/action-types.js';

type CourseType = {
  resources: ResourcesType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  }
};

export const Course = ({ resources, route }: CourseType): Node => {
  const courseId = route.match.params.courseId;
  const courseData = resources.courses[courseId];
  if (!courseData) {
    return <div>Can not find course [invalid course ID]</div>;
  }
  store.dispatch(setCourseStatus({
    status: CourseStatuses.STARTED,
    course: courseId
  }));
  return (
    <Page>
      <CoursePresentation {...courseData} />
      <CourseModulesPresentation courseData={courseData} resources={resources} />
      <Link to={`/course/${courseId}/assessment`}>Go to Assessment</Link>
    </Page>
  );
};
