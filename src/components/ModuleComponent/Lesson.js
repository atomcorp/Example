// @flow
/**
 * Shows a lesson
 */

import React from 'react';
import type {Node} from 'react';
import styles from './lesson.module.css';

type LessonFieldsType = {
  field_headline: Array<{
    value: string
  }>,
  field_body: Array<{
    value: string
  }>,
  field_image: Array<{
    alt: string,
    url: string
  }>
};

export const Lesson = ({
  field_headline,
  field_body,
  field_image,
}: LessonFieldsType): Node => (
  <div className="lesson">
    <h3>{field_headline[0].value}</h3>
    {
        field_image && <img
          className={styles.img}
          src={field_image[0].url}
          alt={field_image[0].alt} />
    }
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
