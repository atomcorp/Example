// @flow
/**
 * Shows a lesson
 */

import React from 'react';
import type {Node} from 'react';

type LessonFieldsType = {
  field_headline: Array<{
    value: string
  }>,
  field_body: Array<{
    value: string
  }>
};

export const Lesson = ({
  field_headline,
  field_body,
}: LessonFieldsType): Node => (
  <div className="lesson">
    <h2>{field_headline[0].value}</h2>
    {
      /*
      * dangerouslySetInnerHTML is React's equivilant for .innerHTML
      * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
      */
    }
    <div dangerouslySetInnerHTML={{
      __html: field_body[0].value,
    }} />
  </div>
);
