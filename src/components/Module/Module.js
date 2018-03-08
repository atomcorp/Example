// FLOW is A pain here, redo or something ...!

/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * each get printed on sepearate pages
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../../containers/page/page.js';
import { ModuleComponent } from '../ModuleComponent/ModuleComponent.js'

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
    this.state = {
      moduleComponentCount: resources.modules[moduleId].field_lesson.length,
      visibleModuleComponent: 1,
      nextButtonDisabled: false
    };
  }

  incrementVisible() {
    if (this.state.visibleModuleComponent < this.state.moduleComponentCount) {
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
        <h1>{this.moduleData.title}</h1>
        <div>
          Progress {this.state.visibleModuleComponent} / {this.state.moduleComponentCount}
        </div>
        {
          // TODO: might not use .field_lesson
          this.moduleData.field_lesson.map((moduleComponentId, i) => {
            return <ModuleComponent
              key={i}
              moduleComponent={this.resources.moduleComponents[moduleComponentId]}
              isVisible={{
                thisId: i + 1,
                visibleId: this.state.visibleModuleComponent,
              }}
              disableNextButton={willDisable => this.handleDisableButton(willDisable)} />
          })
        }
        { 
          this.state.visibleModuleComponent > 1
          && <button onClick={() => this.decrementVisible()}>Prev</button>
        }
        {
          this.state.visibleModuleComponent < this.state.moduleComponentCount
          && <button 
            disabled={this.state.nextButtonDisabled} 
            onClick={() => this.incrementVisible()}>Next</button>
        }
        {
          this.state.visibleModuleComponent === this.state.moduleComponentCount
          && <Link to={`/course/${this.courseId}`}>Back to course</Link>
        }
      </Page>
    )
  }

}

Module.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object
}