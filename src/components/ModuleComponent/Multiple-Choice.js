/**
 * Shows a Multiple-Choice Question
 */
import React, { Component } from 'react';

const Choice = ({ text, isCorrect, handleClick}) => {
  return (
    <div 
      onClick={() => handleClick(isCorrect)}>
      {text} ({ isCorrect ? 'correct' : 'incorrect' })
    </div>
  );
};

/**
 * Will need to add state to this
 * Add click handler
 * If correct choice is clicked
 * pass callback to enable 'Next' button to be pressed
 */
export class MultipleChoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // has selected correct answer && isDirty
    }
    this.disableNextButton = props.disableNextButton;
    this.data = props.data;
    this.disableNextButton(true);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(isCorrect) {
    if (isCorrect) {
      this.disableNextButton(false);
    }
    
  }

  render() {
    return (
      <div className="multiple-question">
        <div className="question">
          <h2>{this.data.field_question}</h2>
        </div>
        <ul className="choices">
        {
          this.state.correctChoice && 
          'Correct choice'
        }
          {
            /* 
             * First choice is always correct,
             * the we just shuffle choices 
            */
            shuffle(
              [
                this.data.field_correct_choice,
                ...this.data.field_incorrect_choices
              ].map(
                (choiceData: string, i: number) => {
                  const isCorrect = i === 0 ? true : false;
                  return <Choice
                    key={ i }
                    text={ choiceData }
                    isCorrect={ isCorrect }
                    handleClick={ this.handleClick } />
                }
              ))
          }
        </ul>
      </div>
    );
  }
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