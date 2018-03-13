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
import PropTypes from 'prop-types';
import Page from '../../containers/page/page.js';
import {
  ModuleInformation,
  ModuleComponents,
} from './ModulePresentational.js';
import {
  ModuleProgress,
} from './ModuleProgress.js';
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
        courseId: string
      }
    }
  },
  done: () => void
};

type StateType = {
  visibleModuleComponent: number,
  nextButtonDisabled: boolean,
  completed: boolean
};

/**
 * use prev and next buttons to keep state of progress
 * will be passed down to Module Components
 * 1. Get how many components there are
 * 2. Always start with one
 * 3. Pass current component to ModuleComponent,
 *    so it only renders that one
 * 4.
 */
export class Module extends Component<PropsType, StateType> {
  courseId: string;
  resources: ResourcesType;
  moduleData: ModuleFieldsType;
  moduleComponentLength: number;
  completeModule: string => void;
  constructor(props: PropsType) {
    super(props);
    // setting componentCount is ugly as anything
    const {route, resources} = props;
    const moduleId = route.match.params.moduleId;
    // $FlowFixMe
    const completeModuleHoF =
      (id: string): void => (): void => this.props.done(id);
    this.courseId = route.match.params.courseId;
    this.resources = resources;
    this.moduleData = this.resources.modules[moduleId];
    this.moduleComponentLength =
      resources.modules[moduleId].field_lesson.length;
    this.completeModule = completeModuleHoF(moduleId);
    // state is only stuff local to Module that can change
    this.state = {
      visibleModuleComponent: 1,
      nextButtonDisabled: false,
      completed: false,
    };
    // bind .this to Module Class, not whatever invokes it down the line
    this.incrementVisible = this.incrementVisible.bind(this);
    this.decrementVisible = this.decrementVisible.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
    this.completeModuleButton = this.completeModuleButton.bind(this);
  }
  incrementVisible() {
    if (this.state.visibleModuleComponent < this.moduleComponentLength) {
      this.setState((prevState: {}): void => ({
        visibleModuleComponent: ++prevState.visibleModuleComponent,
      }));
    }
  }
  decrementVisible() {
    if (this.state.visibleModuleComponent > 1) {
      this.setState((prevState: {}): void => ({
        visibleModuleComponent: --prevState.visibleModuleComponent,
      }));
    }
  }
  handleDisableButton(willDisable: boolean) {
    if (willDisable !== this.state.nextButtonDisabled) {
      this.setState({
        nextButtonDisabled: willDisable,
      });
    }
  }
  completeModuleButton() {
    this.completeModule();
    this.setState({
      completed: true,
    });
  }
  render(): Node {
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
          visibleModuleComponentId={ this.state.visibleModuleComponent }
          disableButton={ this.handleDisableButton } />
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
          this.state.completed && <Redirect to={`/course/${this.courseId}`} />
        }
      </Page>
    );
  }
}

Module.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object,
  moduleStatuses: PropTypes.object,
  done: PropTypes.func,
};
