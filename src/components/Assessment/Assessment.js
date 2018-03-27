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
import AssessmentButtons from './AssessmentButtons.js';

const TitleElement = ({title}: { title: Array<{value: string}> }): Node => {
  return (
    <h1>{title[0].value} Assessment</h1>
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
  passed: boolean,
  error: string
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
  target: number;
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
    this.testsStatuses = resetTestStatuses(
      this.courseData.field_course_assessment
    );
    this.completeAssessment = completeAssessmentHoF(this.courseId);
    this.score = 0;
    this.target = Math.ceil(
      this.courseData.field_course_assessment.length * 0.8
    );
    this.state = {
      completed: false,
      submitted: false,
      passed: false,
      error: '',
    };
  }
  completeAssessmentButton = () => {
    this.completeAssessment();
    this.setState({
      completed: true,
    });
  }
  handleSubmit = () => {
    const validateStatus = (
      status: 'not-started' | 'incorrect' | 'correct'
    ): boolean => status !== 'not-started';
    const isValid = this.testsStatuses.every(
      (test: AssessmentTestsType): boolean => validateStatus(test.status)
    );
    if (isValid) {
      this.score = markTests(this.testsStatuses);
      this.succesfullySubmitted(gradeAssessment(this.target, this.score));
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
    const validateStatus = (
      status: 'not-started' | 'incorrect' | 'correct'
    ): boolean => status !== 'not-started';
    const notInputtedCount = this.testsStatuses.reduce((
      acc: number,
      val: AssessmentTestsType
    ): number => {
      if (validateStatus(val.status)) {
        return acc;
      }
      return acc + 1;
    }, 0);
    this.setState({
      error: `
        You must answer every question. \n
        ${notInputtedCount} missing.`,
    });
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
  reset = () => {
    this.testsStatuses = resetTestStatuses(
      this.courseData.field_course_assessment
    );
    this.score = 0;
    this.setState({
      submitted: false,
      passed: false,
    });
  }
  render(): Node {
    if (!this.courseData) {
      return <div>Course ID is not found</div>;
    }
    return (
      <Page>
        <TitleElement title={this.courseData.title} />
        <div>
          {this.state.error}
          <br/>
          {
            this.state.submitted && (
              this.state.passed
                ? `Passed: ${this.score} / ${
                  this.courseData.field_course_assessment.length
                }`
                : `Failed: ${this.score} / ${
                  this.courseData.field_course_assessment.length
                }`
            )
          }
          <br/>
          {
            this.state.submitted && `Pass minimum: ${this.target}`
          }
        </div>

        {
          this.courseData.field_course_assessment.map(
            (assessment: {target_id: string}, i: number): Node => (
              // cause components has lessons in it?
              <MultiChoiceAssessment
                key={i}
                id={assessment.target_id}
                assessment={
                  // $FlowFixMe
                  this.props.resources.components[assessment.target_id]
                }
                handleClick={this.handleClick}
                submitted={this.state.submitted} />
            )
          )
        }
        <AssessmentButtons
          state={this.state}
          methods={{
            handleSubmit: this.handleSubmit,
            reset: this.reset,
            completeAssessmentButton: this.completeAssessmentButton,
          }} />
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

const resetTestStatuses = (
  assessment: Array<{
    target_id: string
  }>
): Array<AssessmentTestsType> => {
  return assessment.map(
    (test: {target_id: string}): AssessmentTestsType => ({
      id: test.target_id,
      status: 'not-started',
    })
  );
};
