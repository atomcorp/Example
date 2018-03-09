// @flow
/**
 * Depending on type passed to it shows 
 * a type of lesson or test
 */
import React from 'react';
import type { Node } from 'react'
import { Lesson } from './Lesson.js';
import { MultipleChoice } from './Multiple-Choice.js';
import type {
  MultiChoiceFieldsType, LessonFieldsType 
} from '../../types.js';

type ModuleComponentContainerType = {
  moduleComponent: MultiChoiceFieldsType | LessonFieldsType
};

export const ModuleComponent = ({ moduleComponent }: ModuleComponentContainerType): Node => {
  // TODO: transitions
  // if (isVisible.thisId !== isVisible.visibleId) {
  //   return <div></div>;
  // }
  switch (moduleComponent.type) {
    case 'Lesson':
      return (
        <Lesson {...moduleComponent} />
      )
    case 'Multiple-Choice Question': 
      return (
        <MultipleChoice {...moduleComponent} />
      )
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
  children
}: ModuleComponentVisibilityType): Node => {
  const { thisId, visibleId } = isVisible;
  return (
    <div>
      ({thisId === visibleId ? 'VISIBLE' : 'INVISIBLE'})
      { children }
    </div>
  );
};
