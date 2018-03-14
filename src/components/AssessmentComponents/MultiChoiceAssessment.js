// @flow
import React from 'react';
import type {Node} from 'react';
import {once as myOnce, shuffle} from '../../utility/utility.js';

type PropsType = {
  assessment: {
    field_correct_choice: string,
    field_incorrect_choices: Array<string>,
    field_question: string
  },
  handleClick: ({id: string, isCorrect: boolean}) => void,
  id: string
};

export const MultiChoiceAssessment = (props: PropsType): Node => {
  const shuffleOnce = myOnce((children: Array<Node>): Array<Node> => {
    return shuffle(children);
  });
  return (
    <div className="multiple-question">
      <div className="question">
        <h2>{props.assessment.field_question}</h2>
      </div>
      <br />
      <div className={'name'}>
        <MultipleChoiceList choices={[
            props.assessment.field_correct_choice,
            ...props.assessment.field_incorrect_choices,
          ]}
          handleClick={props.handleClick}
          shuffleOnce={shuffleOnce}
          id={props.id} />
      </div>
      <br />
    </div>
  );
};

type MultipleChoiceListType = {
  choices: Array<string>,
  handleClick: ({id: string, isCorrect: boolean}) => void,
  shuffleOnce: (Array<Node>) => Array<Node>,
  id: string
};

const MultipleChoiceList = ({
  choices,
  handleClick,
  shuffleOnce,
  id,
}: MultipleChoiceListType): Array<Node> => (
  shuffleOnce(choices.map((
    choice: string,
    i: number
  ): Node => {
    return <Choice
      key={i}
      text={choice}
      isCorrect={i === 0 ? true : false}
      handleClick={handleClick}
      id={id} />;
  }))
);

type ChoiceType = {
  text: string,
  isCorrect: boolean,
  handleClick: ({id: string, isCorrect: boolean}) => void,
  id: string
};

const Choice = ({
  text,
  isCorrect,
  handleClick,
  id,
}: ChoiceType): Node => {
  return (
    <div onClick={(): void => handleClick({
      isCorrect,
      id,
    })}>
      {text} <span className={'style'}>{isCorrect ? '✅' : '❎'}</span>
    </div>
  );
};
