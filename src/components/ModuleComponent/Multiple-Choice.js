/**
 * Shows a Multiple-Choice Question
 */
import React from 'react';

const Choice = ({text, isCorrect}) => {
  return (
    <div>{text} ({ isCorrect ? 'correct' : 'incorrect' })</div>
  );
};

export const MultipleChoice = ({ data }) => {
  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{ data.field_question }</h2>
      </div>
      <ul className="choices">
        {
          /* 
           * First choice is always correct,
           * the we just shuffle choices 
          */
          shuffle(
            [
              data.field_correct_choice, 
              ...data.field_incorrect_choices 
            ].map(
            (choiceData: string, i: number) => {
              return <Choice 
                text={choiceData}
                isCorrect={i === 0 ? true : false} />
            }
          ))
        }
      </ul>
    </div>
  );
}

// https://stackoverflow.com/a/6274381/2368141
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}