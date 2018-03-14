// @flow
/**
 * This components encapsulates a state for the components to use.
 * Receive all the components, create an object
 *
 */

import React, {Component} from 'react';
import type {Node} from 'react';
import type {ModuleComponentType} from '../../types.js';
import {
  ModuleComponent,
  ModuleComponentVisibility,
} from '../ModuleComponent/ModuleComponent.js';

type ModuleComponentsType = {
  modulesComponents: Array<string>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: number
};

class ModuleComponents extends Component<ModuleComponentsType, void> {
  constructor(props: ModuleComponentsType) {
    super(props);
    // Currently has no reason to be a class
    // however, probably will
  }
  render(): Array<Node> {
    return (
      this.props.modulesComponents.map((
        moduleComponentId: string,
        i: number
      ): Node => (
          <ModuleComponentVisibility
            key={i}
            isVisible={{
              thisId: i + 1,
              visibleId: this.props.visibleModuleComponentId,
            }}>
            <ModuleComponent
              moduleComponent={
                this.props.allModuleComponents[moduleComponentId]
              } />
          </ModuleComponentVisibility>
        )
      )
    );
  }
}

export default ModuleComponents;
