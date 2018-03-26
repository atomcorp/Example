// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import type {Node} from 'react';
import {once as myOnce, shuffle} from '../../utility/utility.js';
import styles from './Multiple-Choice.module.css';

type ChoiceType = {
  text: string,
  isCorrect: boolean,
  handleClick: boolean => void,
  clicked: boolean
};

const Choice = ({
  text,
  isCorrect,
  handleClick,
}: ChoiceType): Node => {
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
    // state is maintained between all questions...
    this.state = {
      clicked: false,
      isCorrectChoice: '',
    };
  }

  shuffleOnce = myOnce((children: Array<Node>): Array<Node> => {
    return shuffle(children);
  })
  // property initializer syntax
  // https://github.com/facebook/flow/issues/5874#issuecomment-369922816
  handleClick = (isCorrect: boolean) => {
    if (!this.state.clicked) {
      this.setState({
        clicked: true,
        isCorrectChoice: isCorrect ? 'Correct' : 'Incorrect',
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
        state={this.state}
        shuffleOnce={this.shuffleOnce} />
    );
  }
}

type MultipleChoicePresentationType = {
  field_question: string,
  field_correct_choice: string,
  field_incorrect_choices: Array<string>,
  handleClick: boolean => void,
  state: StateType,
  shuffleOnce: (Array<Node>) => Array<Node>
};

const MultipleChoicePresentation = ({
  field_question,
  field_correct_choice,
  field_incorrect_choices,
  handleClick,
  state,
  shuffleOnce,
}: MultipleChoicePresentationType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h2>{field_question[0].value}</h2>
    </div>
    <div className="choice">
      {
        state.clicked && state.isCorrectChoice
      }
    </div>
    <br />
    <div className={`choices ${state.clicked ? styles.choicesChosen : ''}`}>
      <MultipleChoiceList choices={[
          field_correct_choice[0],
          ...field_incorrect_choices,
        ]}
        handleClick={handleClick}
        clicked={state.clicked}
        shuffleOnce={shuffleOnce} />
    </div>
    <br/>
  </div>
);

type MultipleChoiceListType = {
  choices: Array<string>,
  handleClick: boolean => void,
  clicked: boolean,
  shuffleOnce: (Array<Node>) => Array<Node>
};

const MultipleChoiceList = ({
  choices,
  handleClick,
  clicked,
  shuffleOnce,
}: MultipleChoiceListType ): Array<Node> => (
  shuffleOnce(choices.map((
    choice: string,
    i: number
  ): Node => {
    return <Choice
      key={i}
      text={choice.value}
      isCorrect={i === 0 ? true : false}
      clicked={ clicked }
      handleClick={handleClick} />;
  }))
);
