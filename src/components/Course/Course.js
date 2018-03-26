// @flow
/**
 * Course
 * -----
 * Takes an ID for one course,
 * Lists all the Module titles
 * And lessons and tests within
 */
import React from 'react';
import type {Node} from 'react';
import Page from '../../containers/page/page.js';
import {
  CoursePresentation,
  CourseModulesPresentation,
  CourseAssessment,
} from './CoursePresentation.js';
import type {
  ResourcesType,
  ModuleStatusesType,
  CoursesStatusesType,
  AssessmentStatusesType,
} from '../../types.js';

const testCourseComplete = (
  courseId: string,
  modulesIds: Array<string>,
  moduleStatuses: ModuleStatusesType,
  assessmentStatuses: AssessmentStatusesType
): boolean => {
  // all courses module complete
  // AND assessment complete
  return Object.keys(modulesIds).every((id: string): boolean => moduleStatuses[id])
    && assessmentStatuses[courseId]
    ? true : false;
};

type CourseType = {
  resources: ResourcesType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  },
  moduleStatuses: ModuleStatusesType,
  coursesStatuses: CoursesStatusesType,
  assessmentStatuses: AssessmentStatusesType,
  updateCourseStatus: (string, string) => void
};

export const Course = ({
  resources,
  route,
  moduleStatuses,
  coursesStatuses,
  updateCourseStatus,
  assessmentStatuses,
}: CourseType): Node => {
  const courseId = route.match.params.courseId;
  const courseData = resources.courses[courseId];
  const courseDone = testCourseComplete(
    courseId,
    courseData.field_modules,
    moduleStatuses,
    assessmentStatuses
  );
  if (!courseData) {
    return <div>Can not find course [invalid course ID]</div>;
  }
  // TODO: Remove the onClick from Courses?
  if (
    coursesStatuses[courseId] === 'NOT_STARTED'
    || !coursesStatuses[courseId]
  ) {
    updateCourseStatus('STARTED', courseId);
  }
  if (courseDone && coursesStatuses[courseId] !== 'COMPLETED') {
    updateCourseStatus('COMPLETED', courseId);
  }
  return (
    <Page>
      {
        courseDone ? 'Course status: Done' : 'Course status: Not done'
      }
      <CoursePresentation {...courseData} />
      <CourseModulesPresentation
        courseData={courseData}
        resources={resources}
        moduleStatuses={moduleStatuses} />
      <CourseAssessment
        courseId={courseId}
        completed={assessmentStatuses[courseId]}
        courseTitle={courseData.title[0].value} />
      <h2>Resources</h2>
      <ul>
        <li>resource 1</li>
        <li>resource 2</li>
        <li>resource 3</li>
      </ul>
    </Page>
  );
};
