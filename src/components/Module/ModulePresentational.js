// @flow
import React from 'react';
import type {Node} from 'react';

type ModuleInformationType ={
  courseName: string,
  moduleName: string,
  currentModuleComponent: number,
  moduleComponentLength: number
};

export const ModuleInformation = ({
  courseName,
  moduleName,
  currentModuleComponent,
  moduleComponentLength,
}: ModuleInformationType): Node => (
  <div>
    <h1>{courseName} Course</h1>
    <h2>{moduleName} ({currentModuleComponent} / {moduleComponentLength})</h2>
  </div>
);

