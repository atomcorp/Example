// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {once as myOnce, shuffle} from '../../utility/utility.js';

type PropsType = {
  assessment: {
    field_correct_choice: string,
    field_incorrect_choices: Array<string>,
    field_question: string
  },
  handleClick: ({id: string, isCorrect: boolean}) => void,
  id: string,
  submitted: boolean
};

export const MultiChoiceAssessment = (props: PropsType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h2>{props.assessment.field_question}</h2>
    </div>
    <br />
    <div className={'name'}>
      <MultipleChoiceList
        choices={
          [props.assessment.field_correct_choice,
          ...props.assessment.field_incorrect_choices,
          ].reduce((
            acc: Array<{choice: string, isCorrect: boolean}>,
            choice: string,
            i: number
          ): Array<{choice: string, isCorrect: boolean }> => {
          return [...acc, {
            choice,
            isCorrect: i < 1 ? true : false,
          }];
          }, [])
        }
        handleClick={props.handleClick}
        id={props.id}
        submitted={props.submitted} />
    </div>
    <br />
  </div>
);

type MultipleChoiceListType = {
  choices: Array<string>,
  handleClick: ({id: string, isCorrect: boolean}) => void,
  id: string,
  submitted: boolean
};

type StateMultipleChoiceListType = {
  selectedId: string
};

class MultipleChoiceList extends Component<
  MultipleChoiceListType,
  StateMultipleChoiceListType
> {
  constructor(props: MultipleChoiceListType) {
    super(props);
    this.state = {
      selectedId: '',
    };
  }
  shuffleOnce = myOnce((children: Array<Node>): Array<Node> => {
    return shuffle(children);
  });
  handleChoice = (
    choice: {id: string, isCorrect: boolean},
    choiceRef: string
  ) => {
    if (!this.props.submitted) {
      this.props.handleClick(choice);
      this.setState({
        selectedId: choiceRef,
      });
    }
  }
  componentWillUpdate() {
    // reset, so highlighted choice
    // isn't selected anymore
    if (this.props.submitted) {
      this.setState({
        selectedId: '',
      });
    }
  }
  // add another click here for selection
  render(): * {
    return (
      this.shuffleOnce(this.props.choices).map((
        choice: string,
        i: number
      ): Node => {
        return <Choice
          key={i}
          text={choice.choice}
          isCorrect={choice.isCorrect}
          id={this.props.id}
          submitted={this.props.submitted}
          selectedId={this.state.selectedId}
          handleChoice={this.handleChoice}
          choiceRef={i + ''} />;
      })
    );
  }
}

type ChoiceType = {
  text: string,
  isCorrect: boolean,
  // handleClick: ({id: string, isCorrect: boolean}) => void,
  id: string,
  submitted: boolean,
  selectedId: string,
  handleChoice: ({id: string, isCorrect: boolean}, choiceRef: string) => void,
  choiceRef: string
};

const Choice = ({
  text,
  isCorrect,
  id,
  submitted,
  selectedId,
  handleChoice,
  choiceRef,
}: ChoiceType): Node => {
  return (
    <div onClick={(): void => handleChoice({
      isCorrect,
      id,
    }, choiceRef)}
    style={{
      color: isCorrect ? 'green' : 'red',
      fontWeight: selectedId === choiceRef ? '700' : '400',
    }}>
      {text} <span style={{
          display: submitted ? 'inline' : 'none',
          color: isCorrect ? 'green' : 'red',
        }}>{isCorrect ? '✅' : '❎'}</span>
    </div>
  );
};
