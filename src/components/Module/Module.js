/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * each get printed on sepearate pages
 */
import React from 'react';
import Page from '../../containers/page/page.js';
import { ModuleComponent } from '../ModuleComponent/ModuleComponent.js'

/**
 * Module will need to be stateful, 
 * use prev and next buttons to keep state of progress
 * will be passed down to Module COmponents
 */
export const Module = ({ state, moduleId }) => {
  if (!state.loaded) {
    return 'Loading...';
  }
  const moduleData = state.modules[moduleId];
  return (
    <Page>
      <h1>{moduleData.title}</h1>
      {
        // TODO: not use .field_lesson
        moduleData.field_lesson.map((moduleComponentId, i) => {
          return <ModuleComponent 
            key={ i }
            moduleComponent={ state.moduleComponents[moduleComponentId] } />
        })
      }
      Prev - Next
    </Page>
  )
};