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
import {MultiChoiceAssessment}
  from '../AssessmentComponents/MultiChoiceAssessment.js';

const TitleElement = ({title}: { title: string }): Node => {
  return (
    <h1>{title} Assessment</h1>
  );
};

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
  done: string => void,
  resources: ResourcesType
};

type StateType = {
  completed: boolean,
  submitted: boolean,
  passed: boolean
};

type AssessmentTestsType = {
  id: string,
  status: 'not-started' | 'incorrect' | 'correct'
};

export class Assessment extends Component<PropsType, StateType> {
  courseId: string;
  courseData: CourseFieldsType;
  testsStatuses: Array<AssessmentTestsType>
  score: number;
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
    this.testsStatuses = this.courseData.assessment.map(
      (assessmentId: string): AssessmentTestsType => ({
        id: assessmentId,
        status: 'not-started',
      })
    );
    this.completeAssessment = completeAssessmentHoF(this.courseId);
    this.score = 0;
    this.state = {
      completed: false,
      submitted: false,
      passed: false,
    };
  }
  completeAssessmentButton = () => {
    this.completeAssessment();
    this.setState({
      completed: true,
    });
  }
  handleSubmit() {
    const validateStatus = (
      status: 'not-started' | 'incorrect' | 'correct'
    ): boolean => status !== 'not-started';
    const isValid = this.testsStatuses.every(
      (test: AssessmentTestsType): boolean => validateStatus(test.status)
    );
    if (isValid) {
      this.score = markTests(this.testsStatuses);
      this.succesfullySubmitted(gradeAssessment(2, this.score));
    } else {
      this.invalidSubmission();
    }
  }
  succesfullySubmitted(hasPassed: boolean) {
    this.setState({
      submitted: true,
      passed: hasPassed,
    });
  }
  invalidSubmission() {

  }
  handleClick = ({id, isCorrect}: {id: string, isCorrect: boolean}) => {
    this.testsStatuses = setTestStatus(
      this.testsStatuses,
      {
        id,
        status: isCorrect ? 'correct' : 'incorrect',
      }
    );
  }

  render(): Node {
    if (!this.courseData) {
      return <div>Course ID is not found</div>;
    }
    return (
      <Page>
        <TitleElement title={this.courseData.title} />
        <div>
          {
            this.state.passed
              ? `Passed: ${this.score}`
              : `Failed: ${this.score}`
          }
        </div>
        {
          this.courseData.assessment.map(
            (assessmentId: string, i: number): Node => (
              <MultiChoiceAssessment
                key={i}
                id={assessmentId}
                assessment={this.props.resources.assessments[assessmentId]}
                handleClick={this.handleClick} />
            )
          )
        }
        <button onClick={(): void => this.handleSubmit()}>Check answers</button>
        <button>Try again</button>
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

// Utility functions
const setTestStatus = (
  prevTestStatus: Array<AssessmentTestsType>,
  {id, status}: AssessmentTestsType
): Array<AssessmentTestsType> => {
  return prevTestStatus.reduce((
    acc: Array<AssessmentTestsType>,
    val: AssessmentTestsType
  ): Array<AssessmentTestsType> => {
    if (val.id === id) {
      return [...acc, Object.assign({}, val, {
        status: status,
      })];
    }
    return [...acc, val];
  }, []);
};

const markTests = (tests: Array<AssessmentTestsType>): number => {
  return tests.reduce((acc: number, val: AssessmentTestsType): number => {
    return val.status === 'correct' ? acc + 1 : acc;
  }, 0);
};

const gradeAssessment = (target: number, score: number): boolean => {
  return score >= target;
};
