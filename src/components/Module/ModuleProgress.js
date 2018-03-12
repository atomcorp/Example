// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';

type ModuleProgressType = {
  state: {
    nextButtonDisabled: boolean,
    visibleModuleComponent: number
  },
  moduleComponentLength: number,
  update: {
    decrement: () => void,
    increment: () => void,
    complete: () => void
  },
  completeModuleButton: () => void, 
  courseId: string
};

export const ModuleProgress = ({
  state,
  moduleComponentLength,
  update,
  courseId
}: ModuleProgressType): Node => (
    <div>
      <ProgressButton
        label="Prev"
        update={update.decrement}
        visibility={
          state.visibleModuleComponent > 1 ? 'visible' : 'hidden'
        } />
      <ProgressButton
        label="Next"
        update={update.increment}
        visibility={
          state.visibleModuleComponent < moduleComponentLength ? 'visible' : 'hidden'
        }
        disabled={state.nextButtonDisabled} />
      <ProgressButton
        label="Complete module"
        update={update.complete}
        visibility={
          state.visibleModuleComponent === moduleComponentLength ? 'visible' : 'hidden'
        }
        disabled={state.nextButtonDisabled} />
      {/* TODO: add warning, you'll lose your progress */}
      <br />
      <Link to={`/course/${courseId}`}>Back to course</Link>
    </div>
  );

type ProgressButtonType = {
  label: string,
  update: () => void,
  visibility: 'visible' | 'hidden',
  props?: {}
};

const ProgressButton = ({
  label,
  update,
  visibility,
  ...props
}: ProgressButtonType): Node =>
  <button
    style={{ visibility: visibility }}
    onClick={(): void => update()} {...props}>{label}</button>