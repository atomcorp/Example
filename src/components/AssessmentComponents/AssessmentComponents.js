// @flow
import React from 'react';
import type {Node} from 'react';

type TempChoiceType = {
  text: string,
  isCorrect: boolean
};

const TempChoice = ({text, isCorrect}: TempChoiceType): Node => (
  <div>
    {text} <span>{isCorrect ? '✅' : '❎'}</span>
  </div>
);

type TempChoicesType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>
};

export const TempChoices = ({
  field_question,
  field_correct_choice,
  field_incorrect_choices,
}: TempChoicesType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h2>{field_question}</h2>
    </div>
    <ul className="choices">
      {
        [field_correct_choice, ...field_incorrect_choices].map(
          (choiceData: string, i: number): Node => (
            <TempChoice
              key={i}
              text={choiceData}
              isCorrect={i === 0 ? true : false} />
          )
        )
      }
    </ul>
  </div>
);
