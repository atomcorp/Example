// @flow
import React from 'react';
import type {Node} from 'react';
import type {ModuleComponentType} from '../../types.js';
import {
  ModuleComponent,
  ModuleComponentVisibility,
} from '../ModuleComponent/ModuleComponent.js';

type ModuleInformationType ={
  courseName: string,
  moduleName: string,
  currentModuleComponent: string,
  moduleComponentLength: string
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

type ModuleComponentsType = {
  modulesComponents: Array<string>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: number,
  disableButton: (boolean) => boolean
};

export const ModuleComponents = ({
  modulesComponents,
  allModuleComponents,
  visibleModuleComponentId,
  // disableButton
}: ModuleComponentsType): Array<Node> => (
  modulesComponents.map((
    moduleComponentId: string,
    i: number
  ): Node => (
      <ModuleComponentVisibility
        key={i}
        isVisible={{
          thisId: i + 1,
          visibleId: visibleModuleComponentId,
        }}>
        <ModuleComponent
          moduleComponent={allModuleComponents[moduleComponentId]} />
      </ModuleComponentVisibility>
    )
  )
);

