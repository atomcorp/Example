// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import type { Node } from 'react';
import { once as myOnce } from '../../utility/utility.js';

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

type PropsType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>
};

/**
 * Will need to add state to this
 * Add click handler
 * If correct choice is clicked
 * pass callback to enable 'Next' button to be pressed
 */
export class MultipleChoice extends Component { 

  constructor(props: PropsType) {
    super(props);
    this.state = {
      clicked: false
    }
  }
  
  render(): Node {
    return (
      <MultipleChoicePresentation
        field_question={this.props.field_question}
        field_correct_choice={this.props.field_correct_choice}
        field_incorrect_choices={this.props.field_incorrect_choices} />
    );
  }
}

MultipleChoice.propTypes = {
  field_question: PropTypes.string,
  field_correct_choice: PropTypes.string,
  field_incorrect_choices: PropTypes.array,
};

const MultipleChoicePresentation = ({
  field_question,
  field_correct_choice,
  field_incorrect_choices
}: MultipleChoiceType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h2>{field_question}</h2>
    </div>
    <div className="choices">
      <MultipleChoiceList choices={[
        field_correct_choice,
        ...field_incorrect_choices
      ]} />
    </div>
  </div>
);

const MultipleChoiceList = ({ 
  choices 
}: { 
  choices: Array<string>
}): Array<Node> => (
  // TODO: porper flow support for this section
  // $FlowFixMe
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

const shuffleOnce = myOnce((children: Array<Node>): Array<Node> => {
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

/* eslint-enable */

