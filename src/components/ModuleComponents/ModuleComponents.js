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
  modulesComponents: Array<{
    target_id: string
  }>,
  allModuleComponents: ModuleComponentType,
  visibleModuleComponentId: number
};

class ModuleComponents extends Component<ModuleComponentsType, void> {
  render(): Array<Node> {
    return (
      this.props.modulesComponents.map((
        moduleComponent: {
          target_id: string
        },
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
                this.props.allModuleComponents[moduleComponent.target_id]
              } />
          </ModuleComponentVisibility>
        )
      )
    );
  }
}

export default ModuleComponents;
