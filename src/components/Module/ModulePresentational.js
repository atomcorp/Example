// @flow
import React from 'react';
import type { Node } from 'react';
import type { ModuleComponentType } from '../../types.js';
import { ModuleComponent } from '../ModuleComponent/ModuleComponent.js';

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
  moduleComponentLength
}: ModuleInformationType): Node => (
  <div>
    <h1>{courseName} Course</h1>
    <h2>{moduleName}</h2>
    <div>
      Progress {currentModuleComponent} / {moduleComponentLength}
    </div>
  </div>
);

type ModuleComponentsType = {
  modulesComponents: Array<string>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: string,
  disableButton: (boolean) => boolean
};

export const ModuleComponents = ({
  modulesComponents,
  allModuleComponents,
  visibleModuleComponentId,
  // disableButton
}: ModuleComponentsType): Array<Node> => {
  return modulesComponents.map((
    moduleComponentId: string, 
    i: number
  ): Node => {
    return <ModuleComponent
      key={i}
      moduleComponent={allModuleComponents[moduleComponentId]}
      isVisible={{
        thisId: i + 1,
        visibleId: visibleModuleComponentId,
      }} />
      // disableNextButton={(willDisable: boolean): boolean => disableButton(willDisable)} 
  });
};

