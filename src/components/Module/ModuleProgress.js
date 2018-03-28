// @flow

import React from 'react';
import type {Node} from 'react';
import {Link} from 'react-router-dom';
import styles from './Module.module.css';

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
  courseId: string
};

export const ModuleProgress = ({
  state,
  moduleComponentLength,
  update,
  courseId,
}: ModuleProgressType): Node => (
    <div className={styles.progress}>
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
          state.visibleModuleComponent < moduleComponentLength
            ? 'visible'
            : 'hidden'
        }
        disabled={state.nextButtonDisabled} />
      <ProgressButton
        label="Complete module"
        update={update.complete}
        visibility={
          state.visibleModuleComponent === moduleComponentLength
            ? 'visible'
            : 'hidden'
        }
        disabled={state.nextButtonDisabled} />
      {/*
        TODO: add warning, you'll lose your progress,
        maybe listen for user pressing back button
      */}
      <br /><br />
      <Link
        to={`/course/${courseId}`}>
          (back to course)
        </Link>
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
    style={{visibility: visibility}}
    onClick={(): void => update()} {...props}>{label}</button>;
