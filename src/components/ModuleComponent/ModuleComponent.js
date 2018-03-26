// @flow
/**
 * Depending on type passed to it shows
 * a type of lesson or test
 */
import React from 'react';
import type {Node} from 'react';
import {Lesson} from './Lesson.js';
import {MultipleChoice} from './Multiple-Choice.js';
import type {
  MultiChoiceFieldsType,
  LessonFieldsType,
} from '../../types.js';

type ModuleComponentContainerType = {
  moduleComponent: MultiChoiceFieldsType | LessonFieldsType
};

export const ModuleComponent = (
  {moduleComponent}: ModuleComponentContainerType
): Node => {
  // TODO: transitions
  switch (moduleComponent.type[0].target_id) {
    case 'lesson':
      return (
        <Lesson {...moduleComponent} />
      );
    case 'question':
      return (
        <MultipleChoice {...moduleComponent} />
      );
    default:
      return <div>Error - Check ModuleComponent Types</div>;
  }
};

type ModuleComponentVisibilityType = {
  isVisible: {
    thisId: number,
    visibleId: number
  },
  children: Node
};

export const ModuleComponentVisibility = ({
  isVisible,
  children,
}: ModuleComponentVisibilityType): Node => {
  const {thisId, visibleId} = isVisible;
  return (
    <div style={{display: thisId === visibleId ? 'block' : 'none'}}>
      { children }
    </div>
  );
};
