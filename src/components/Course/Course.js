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
  CourseHeader,
} from './CoursePresentation.js';
import type {
  ResourcesType,
  ModuleStatusesType,
  CoursesStatusesType,
  AssessmentStatusesType,
} from '../../types.js';
import style from './Course.module.css';

const testCourseComplete = (
  courseId: string,
  modules: Array<{
    target_id: string
  }>,
  moduleStatuses: ModuleStatusesType,
  assessmentStatuses: AssessmentStatusesType
): boolean => {
  // all courses module complete
  // AND assessment complete
  return modules.every((
    module: {target_id: string}
  ): boolean => {
    return moduleStatuses[module.target_id];
  })
    && assessmentStatuses[courseId]
    ? true : false;
};

const calculateCourseCompletetion = (
  courseId: string,
  courseModules: Array<{
    target_id: string
  }>,
  moduleStatuses: ModuleStatusesType,
  assessmentStatuses: AssessmentStatusesType
): {complete: number, total: number} => {
  return courseModules.reduce((
    acc: {complete: number, total: number},
    module: {target_id: string}
  ): {complete: number, total: number} => {
    let {total, complete} = acc;
    return {
      total: ++total,
      complete: moduleStatuses[module.target_id] ? ++complete : complete,
    };
  }, {
      total: 1,
      complete: assessmentStatuses[courseId] ? 1 : 0,
    });
};

type CourseType = {
  resources: {
    data: ResourcesType,
    loaded: boolean
  },
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
  if (!resources.loaded) {
    return <div>Loading Course...</div>;
  }
  const courseId = route.match.params.courseId;
  const courseData = resources.data.courses[courseId];
  const courseDone = testCourseComplete(
    courseId,
    courseData.field_modules,
    moduleStatuses,
    assessmentStatuses
  );
  const courseProgress = calculateCourseCompletetion(
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
      <CourseHeader
        title={courseData.title[0].value}
        progress={courseProgress} />
      <div className={style.page}>
        <div className={style.content}>
          <h2>Courses:</h2>
          <CourseModulesPresentation
            courseData={courseData}
            resources={resources.data}
            moduleStatuses={moduleStatuses} />
          <CourseAssessment
            courseId={courseId}
            completed={assessmentStatuses[courseId]}
            courseTitle={courseData.title[0].value} />
          <h4>Resources</h4>
          <ul>
            <li><a href="/">resource 1</a></li>
            <li><a href="/">resource 2</a></li>
            <li><a href="/">resource 3</a></li>
          </ul>
        </div>
        <CoursePresentation courseDone={courseDone} {...courseData} />
      </div>
    </Page>
  );
};
