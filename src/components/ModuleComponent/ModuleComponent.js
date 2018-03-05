/**
 * Depending on type passed to it shows 
 * a type of lesson or test
 */
import React from 'react';
import { Lesson } from './Lesson.js';
import { MultipleChoice } from './Multiple-Choice.js';

export const ModuleComponent = ({moduleComponent}) => {
  switch (moduleComponent.type) {
    case 'Lesson':
      return <Lesson data={moduleComponent} />;
    case 'Multiple-Choice Question': 
      return <MultipleChoice data={moduleComponent} />;
    default:
      return <div>Error</div>;
  }
};