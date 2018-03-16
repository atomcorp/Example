// @flow
import React from 'react';
import type {Node} from 'react';

type StateType = {
  completed: boolean,
  submitted: boolean,
  passed: boolean,
  error: string
};

type MethodsType = {
  handleSubmit: () => void,
  reset: () => void,
  completeAssessmentButton: () => void
};

const AssessmentButtons = ({
  state,
  methods,
}: {state: StateType, methods: MethodsType}): Node => (
  <div>
      {
        !state.submitted
        && <button onClick={(): void => methods.handleSubmit()}>
          Check answers
            </button>
      }
      {
        state.submitted && !state.passed
        && <button onClick={(): void => methods.reset()}>Try again</button>
      }
      {
        state.submitted && state.passed
        && <button onClick={(): void => methods.completeAssessmentButton()}>
          Complete assessment
            </button>
      }
  </div>
);

export default AssessmentButtons;
