// @flow
/**
 * Shows a lesson 
 */

import React from 'react';
import type { Node } from 'react';
import type { LessonType } from '../../types.js';

export const Lesson = ({ field_headline, field_body, ...data }: LessonType): Node => {
  return (
    <div className="lesson">
      <h2>{ field_headline }</h2>
      { 
        /* 
        * dangerouslySetInnerHTML is React's equivilant for .innerHTML
        * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml 
        */ 
      }
      <div dangerouslySetInnerHTML={{
        __html: field_body
      }} />
    </div>
  );
};