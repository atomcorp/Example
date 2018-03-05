/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * these get printed on sepearate pages
 */
import React from 'react';

export const Module = ({ state, moduleComponents }) => {
  if (!state.loaded) {
    return 'Loading...';
  }
  console.log(state, moduleComponents);
  return (
    <div>
      Module
    </div>
  )
}