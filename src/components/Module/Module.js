// FLOW is A pain here, redo or something ...!
// @flow
/**
 * Module
 *
 * Given a Module ID,
 * Holds all the lessons and tests,
 * users click between each sequentially,
 * the module info and progress are independent
 * of the lessons / tests
 */

import React, {Component} from 'react';
import Page from '../../containers/page/page.js';
import {
  ModuleInformation,
} from './ModulePresentational.js';
import {
  ModuleProgress,
} from './ModuleProgress.js';
import ModuleComponents from '../ModuleComponents/ModuleComponents.js';
import {Redirect} from 'react-router-dom';
import type {
  ResourcesType,
  ModuleFieldsType,
} from '../../types.js';

type PropsType = {
  resources: ResourcesType,
  route: {
    match: {
      params: {
        courseId: string,
        moduleId: string
      }
    }
  },
  done: string => void
};

type StateType = {
  visibleModuleComponent: number,
  nextButtonDisabled: boolean,
  completed: boolean
};

// **
//  * use prev and next buttons to keep state of progress
//  * will be passed down to Module Components
//  * 1. Get how many components there are
//  * 2. Always start with one
//  * 3. Pass current component to ModuleComponent,
//  *    so it only renders that one
//  * 4.
//  */
export class Module extends Component<PropsType, StateType> {
  courseId: string;
  resources: ResourcesType;
  moduleData: ModuleFieldsType;
  moduleComponentLength: number;
  completeModule: () => void;

  constructor(props: PropsType) {
    super(props);
    // setting componentCount is ugly as anything
    const {route, resources} = props;
    const moduleId = route.match.params.moduleId;
    // $FlowFixMe
    const completeModuleHoF = (id: string): void => (): void => (
      this.props.done(id)
    );
    this.courseId = route.match.params.courseId;
    this.resources = resources;
    this.moduleData = this.resources.modules[moduleId];
    this.moduleComponentLength =
      resources.modules[moduleId].field_lesson.length;
    // $FlowFixMe
    this.completeModule = completeModuleHoF(moduleId);
    // state is only stuff local to Module that can change
    this.state = {
      visibleModuleComponent: 1,
      nextButtonDisabled: false,
      completed: false,
    };
  }
  incrementVisible = () => {
    /* @flow weak */
    if (this.state.visibleModuleComponent < this.moduleComponentLength) {
      // @FlowFixMe
      this.setState((prevState: StateType): any => ({
        visibleModuleComponent: ++prevState.visibleModuleComponent,
      }));
    }
  }
  decrementVisible = () => {
    if (this.state.visibleModuleComponent > 1) {
      this.setState((prevState: StateType): any => ({
        visibleModuleComponent: --prevState.visibleModuleComponent,
      }));
    }
  }
  handleDisableButton = (willDisable: boolean) => {
    if (willDisable !== this.state.nextButtonDisabled) {
      this.setState({
        nextButtonDisabled: willDisable,
      });
    }
  }
  completeModuleButton = () => {
    this.completeModule();
    this.setState({
      completed: true,
    });
  }
  render(): * {
    if (!this.moduleData) {
      return <div>Module ID is not found</div>;
    }
    return (
      <Page>
        <ModuleInformation
          courseName={ this.resources.courses[this.courseId].title }
          moduleName={ this.moduleData.title }
          currentModuleComponent={ this.state.visibleModuleComponent }
          moduleComponentLength={ this.moduleComponentLength } />
        <ModuleComponents
          modulesComponents={ this.moduleData.field_lesson }
          allModuleComponents={ this.resources.moduleComponents }
          visibleModuleComponentId={ this.state.visibleModuleComponent } />
        <ModuleProgress
          state={ this.state }
          moduleComponentLength={ this.moduleComponentLength }
          update={{
            decrement: this.decrementVisible,
            increment: this.incrementVisible,
            complete: this.completeModuleButton,
          }}
          courseId={ this.courseId } />
        {
          // If you hit the complete module button
          this.state.completed && <Redirect
            to={`/course/${this.courseId}`} />
        }
      </Page>
    );
  }
}
