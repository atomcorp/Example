/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * each get printed on sepearate pages
 */
import React from 'react';
import Page from '../../containers/page/page.js';

const ModuleComponent = ({type}) => {
  return <div>{type}</div>
}

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
            type={ state.moduleComponents[moduleComponentId].type } />
        })
      }
    </Page>
  )
};