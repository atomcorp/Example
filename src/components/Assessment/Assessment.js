// @flow
/**
 * Recieves an array of aquestion/test ids
 * they get printed on one page
 * need to get x% correct 
 */
import React from 'react';
import type { StateType } from '../../types.js';
import Page from '../../containers/page/page.js';

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

const TempChoice = ({ text, isCorrect }: ChoiceType) => {
  return (
    <div>
      {text} <span>{isCorrect ? '✅' : '❎'}</span>
    </div>
  );
};

const TempChoices = ({ field_question, field_correct_choice, field_incorrect_choices}) => {
  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{field_question}</h2>
      </div>
      <ul className="choices">
        {
          [field_correct_choice, ...field_incorrect_choices].map(
            (choiceData: string, i: number) => {
              const isCorrect = i === 0 ? true : false;
              return <TempChoice
                key={i}
                text={choiceData}
                isCorrect={isCorrect} />
            }
          )
        }
      </ul>
    </div>
  )
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
        
          <TempChoices
            key={i}
            {...state.assessments[assessmentId]} />
        )
      }
    </Page>
  );
}