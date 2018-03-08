// @flow
/**
 * Recieves an array of aquestion/test ids
 * they get printed on one page
 * need to get x% correct 
 */
import React from 'react';
import type { Node } from 'react';
import type { ResourcesType } from '../../types.js';
import Page from '../../containers/page/page.js';

const TitleElement = ({ title }: { title: string }): Node => {
  return (
    <h1>{title} Assessment</h1>
  );
};

type TempChoiceType = {
  text: string,
  isCorrect: boolean
};

const TempChoice = ({ text, isCorrect }: TempChoiceType): Node => {
  return (
    <div>
      {text} <span>{isCorrect ? '✅' : '❎'}</span>
    </div>
  );
};

type TempChoicesType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>
};

const TempChoices = ({ 
  field_question, 
  field_correct_choice, 
  field_incorrect_choices 
}: TempChoicesType): Node => {
  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{field_question}</h2>
      </div>
      <ul className="choices">
        {
          [field_correct_choice, ...field_incorrect_choices].map(
            (choiceData: string, i: number): Node => {
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

type AssessmentType = {
  resources: ResourcesType,
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  }
};

export const Assessment = ({ resources, route }: AssessmentType): Node => {
  const courseId = route.match.params.courseId;
  const courseData = resources.courses[courseId];
  if (!courseData) {
    return <div>Course ID is not found</div>;
  }
  return (
    <Page>
      <TitleElement title={courseData.title} />
      {
        courseData.assessment.map((assessmentId: string, i: number): Node =>
          /**
           * TODO: This is not a perm solution,
           * doesn't check for different test etc
           */
          <TempChoices
            key={i}
            {...resources.assessments[assessmentId]} />
        )
      }
    </Page>
  );
}