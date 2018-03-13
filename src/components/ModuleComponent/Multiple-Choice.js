// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import type { Node } from 'react';
import { once as myOnce } from '../../utility/utility.js';
import styles from './Multiple-Choice.module.css';

type ChoiceType = {
  text: string,
  isCorrect: boolean,
  handleClick: boolean => void,
  clicked: boolean
};

const Choice = ({ text, isCorrect, handleClick }: ChoiceType): Node => {
  return (
    <div onClick={ (): void => handleClick(isCorrect) }>
      {text} <span className={styles.icon}>{ isCorrect ? '✅' : '❎' }</span>
    </div>
  );
};

type PropsType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>
};

type StateType = {
  clicked: boolean,
  isCorrectChoice: string
};

/**
 * Will need to add state to this
 * Add click handler
 * If correct choice is clicked
 * pass callback to enable 'Next' button to be pressed
 */
export class MultipleChoice extends Component<PropsType, StateType> { 

  constructor(props: PropsType) {
    super(props);
    this.state = {
      clicked: false,
      isCorrectChoice: ''
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(isCorrect: boolean) {
    if (!this.state.clicked) {
      this.setState({
        clicked: true,
        isCorrectChoice: isCorrect ? 'Correct' : 'Incorrect'
      });
    }
  }
  
  render(): Node {
    return (
      <MultipleChoicePresentation
        field_question={this.props.field_question}
        field_correct_choice={this.props.field_correct_choice}
        field_incorrect_choices={this.props.field_incorrect_choices}
        handleClick={this.handleClick}
        state={this.state} />
    );
  }
}

type MultipleChoicePresentationType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>,
  handleClick: boolean => void,
  state: StateType
};

const MultipleChoicePresentation = ({
  field_question,
  field_correct_choice,
  field_incorrect_choices,
  handleClick,
  state
}: MultipleChoicePresentationType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h2>{field_question}</h2>
    </div>
    <div className="choice">
      {
        state.clicked && (
          state.isCorrectChoice
            ? 'Correct!'
            : 'Incorrect'
        )
      }
    </div>
    <br />
    <div className={`choices ${state.clicked ? styles.choicesChosen : ''}`}>
      <MultipleChoiceList choices={[
          field_correct_choice,
          ...field_incorrect_choices
        ]}
        handleClick={handleClick}
        clicked={state.clicked} />
    </div>
    <br/>
  </div>
);

type MultipleChoiceListType = {
  choices: Array<string>,
  handleClick: boolean => void,
  clicked: boolean
};

const MultipleChoiceList = ({ 
  choices,
  handleClick,
  clicked
}: MultipleChoiceListType ): Array<Node> => (
  shuffleOnce(choices.map((
    choice: string,
    i: number
  ): Node => {
    return <Choice
      key={i}
      text={ choice}
      isCorrect={i === 0 ? true : false}
      clicked={ clicked } 
      handleClick={handleClick} />
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

