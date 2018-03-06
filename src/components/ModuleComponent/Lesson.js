// @flow
/**
 * Shows a lesson 
 */

import React from 'react';
import type { Node } from 'react';
import type { LessonType } from '../../types.js';

export const Lesson = ({ data }: LessonType): Node => {
  return (
    <div className="lesson">
      <h2>{ data.field_headline }</h2>
      { 
        /* 
        * dangerouslySetInnerHTML is React's equivilant for .innerHTML
        * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml 
        */ 
      }
      <div dangerouslySetInnerHTML={{
        __html: data.field_body
      }} />
    </div>
  );
};