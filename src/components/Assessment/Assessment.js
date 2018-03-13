// @flow
/**
 * Recieves an array of aquestion/test ids
 * they get printed on one page
 * need to get x% correct
 */
import React, {Component} from 'react';
import type {Node} from 'react';
import {Redirect} from 'react-router-dom';
import type {ResourcesType, CourseFieldsType} from '../../types.js';
import Page from '../../containers/page/page.js';

const TitleElement = ({title}: { title: string }): Node => {
  return (
    <h1>{title} Assessment</h1>
  );
};

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

const TempChoices = ({
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

type PropsType = {
  assessmentStatuses: {
    [id: string]: boolean
  },
  route: {
    match: {
      params: {
        courseId: string
      }
    }
  },
  done: () => void,
  resources: ResourcesType
};

type StateType = {
  completed: boolean
};

/**
 * Assessment
 */
export class Assessment extends Component<PropsType, StateType> {
  courseId: string;
  courseData: CourseFieldsType;
  completeAssessment: () => void;
  /**
   * constructor
   * @param {PropsType} props
   */
  constructor(props: PropsType) {
    super(props);
    this.courseId = this.props.route.match.params.courseId;
    this.courseData = this.props.resources.courses[this.courseId];
    // flow doesn't seem to get higher-order functions???
    // $FlowFixMe
    const completeAssessmentHoF = (id: string): () => void => (): void => (
      this.props.done(id)
    );
    this.completeAssessment = completeAssessmentHoF(this.courseId);
    this.state = {
      completed: false,
    };
  }
  completeAssessmentButton = () => {
    this.completeAssessment();
    this.setState({
      completed: true,
    });
  }
  render(): Node {
    if (!this.courseData) {
      return <div>Course ID is not found</div>;
    }
    return (
      <Page>
        <TitleElement title={this.courseData.title} />
        {
          this.courseData.assessment.map(
            (assessmentId: string, i: number): Node =>
            // /**
            //  * TODO: This is not a perm solution,
            //  * doesn't check for different test etc
            //  */
              <TempChoices
                key={i}
                {...this.props.resources.assessments[assessmentId]} />
          )
        }
        <button onClick={(): void => this.completeAssessmentButton()}>
          Complete assessment
        </button>
        {
          // If you hit the complete module button
          this.state.completed && <Redirect to={`/course/${this.courseId}`} />
        }
      </Page>
    );
  }
}
