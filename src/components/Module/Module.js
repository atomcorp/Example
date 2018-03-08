// FLOW is A pain here, redo or something ...!

/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * each get printed on sepearate pages
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from '../../containers/page/page.js';
import {
  ModuleInformation, 
  ModuleComponents,
} from './ModulePresentational.js';
import {
  ModuleProgress
} from './ModuleProgress.js';

/** 
 * use prev and next buttons to keep state of progress
 * will be passed down to Module COmponents
 * 1. Get how many components there are
 * 2. Always start with one
 * 3. Pass current component to ModuleComponent,
 *    so it only renders that one
 * 4.
 */
export class Module extends Component {

  constructor(props) {
    super(props);
    // setting componentCount is ugly as anything
    const { route, resources } = props;
    const moduleId = route.match.params.moduleId;
    this.courseId = route.match.params.courseId;
    this.resources = resources;
    this.moduleData = this.resources.modules[moduleId];
    this.moduleComponentLength = resources.modules[moduleId].field_lesson.length;
    this.state = {
      visibleModuleComponent: 1,
      nextButtonDisabled: false
    };
    // bind .this to this Class, not whatever invokes it down the line 
    this.incrementVisible = this.incrementVisible.bind(this);
    this.decrementVisible = this.decrementVisible.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
  }

  incrementVisible() {
    if (this.state.visibleModuleComponent < this.moduleComponentLength) {
      this.setState(prevState => ({
        visibleModuleComponent: ++prevState.visibleModuleComponent
      }));
    }
  }

  decrementVisible() {
    if (this.state.visibleModuleComponent > 1) {
      this.setState(prevState => ({
        visibleModuleComponent: --prevState.visibleModuleComponent
      }));
    }
  }
  
  handleDisableButton(willDisable) {
    if (willDisable !== this.state.nextButtonDisabled) {
      this.setState({
        nextButtonDisabled: willDisable
      })
    }
  }

  render() {
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
            increment: this.incrementVisible
          }}
          courseId={ this.courseId } />
          
      </Page>
    )
  }
}

Module.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object
}