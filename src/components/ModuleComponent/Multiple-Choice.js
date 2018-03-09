// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React from 'react';
import type { Node } from 'react'

type ChoiceType = {
  text: string,
  isCorrect: boolean
};

const Choice = ({ text, isCorrect }: ChoiceType): Node => {
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
  field_incorrect_choices
}: {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>
}): Node => {
  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{ field_question }</h2>
      </div>
      <div className="choices">
        {
          /* 
           * First choice is always correct,
           * then we just shuffle choices 
          */
          
        }
        <MultipleChoiceList choices={[
          field_correct_choice,
          ...field_incorrect_choices
        ]} />
        
      </div>
    </div>
  );
}

const MultipleChoiceList = ({ 
  choices 
}: { 
  choices: Array<string>
}): Array<Node> => (
  shuffleOnce(choices.map((
    choice: string,
    i: number
  ): Node => {
    return <Choice
      key={i}
      text={choice}
      isCorrect={i === 0 ? true : false} />
  }))
);

const shuffleOnce = once((children: Array<Node>): Array<Node> => {
  console.log(children)
  return shuffle(children);
});

// helpers
/* eslint-disable */
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

// https://davidwalsh.name/javascript-once
function once(fn: any, context) {
  var result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}
/* eslint-enable */