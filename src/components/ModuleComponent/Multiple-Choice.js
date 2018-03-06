// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React from 'react';
import type { MultiChoiceType } from '../../types.js';

type ChoiceType = {
  text: string,
  isCorrect: boolean
}

const Choice = ({ text, isCorrect }: ChoiceType) => {
  return (
    <div>
      {text} <span>{isCorrect ? '✅' : '❎' }</span>
    </div>
  );
};

/**
 * Will need to add state to this
 * Add click handler
 * If correct choice is clicked
 * pass callback to enable 'Next' button to be pressed
 */
export const MultipleChoice = ({ 
  field_question, 
  field_correct_choice, 
  field_incorrect_choices, 
  ...data }: MultiChoiceType) => {

  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{ field_question }</h2>
      </div>
      <ul className="choices">
        {
          /* 
           * First choice is always correct,
           * then we just shuffle choices 
          */
          shuffle(
            [
              field_correct_choice,
              ...field_incorrect_choices
            ].map(
              (choiceData: string, i: number) => {
                const isCorrect = i === 0 ? true : false;
                return <Choice
                  key={i}
                  text={choiceData}
                  isCorrect={isCorrect} />
              }
            ))
        }
      </ul>
    </div>
  );
}

// https://stackoverflow.com/a/6274381/2368141
function shuffle(a: Array<any>) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}