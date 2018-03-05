/**
 * Recieves an array of aquestion/test ids
 * they get printed on one page
 * need to get x% correct 
 */
import React from 'react';
import Page from '../../containers/page/page.js';
// TODO: something more reusable for tests
import { MultipleChoice } from '../ModuleComponent/Multiple-Choice';

const TitleElement = ({ title }) => {
  return (
    <h1>{title} Assessment</h1>
  );
};

export const Assessment = ({ state, route }) => {
  if (!state.loaded) {
    return 'Loading...';
  }
  const courseId = route.match.params.courseId;
  const courseData = state.courses[courseId];
  if (!courseData) {
    return <div>Course ID is not found</div>;
  }
  return (
    <Page>
      <TitleElement title={courseData.title} />
      {
        courseData.assessment.map((assessmentId: string, i: number) => 
          /**
           * THis is not a perm solution,
           * doesn't check for different test etc
           */
          <MultipleChoice
            key={i}
            data={state.assessments[assessmentId]} />
        )
      }
    </Page>
  );
}