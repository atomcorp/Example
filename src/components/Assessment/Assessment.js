// @flow
/**
 * Recieves an array of aquestion/test ids
 * they get printed on one page
 * need to get x% correct 
 */
import React from 'react';
import type { StateType } from '../../types.js';
import Page from '../../containers/page/page.js';
// TODO: something more reusable for tests
import { MultipleChoice } from '../ModuleComponent/Multiple-Choice';

const TitleElement = ({ title }: { title: string }) => {
  return (
    <h1>{title} Assessment</h1>
  );
};

type AssessmentType = {
  state: StateType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  }
}

export const Assessment = ({ state, route }: AssessmentType) => {
  if (!state.loaded) {
    return <div>Loading...</div>;
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
           * TODO: This is not a perm solution,
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