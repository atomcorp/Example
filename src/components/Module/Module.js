/**
 * Given an ID,
 * Holds all the lessons and tests, 
 * each get printed on sepearate pages
 */
import React, { Component } from 'react';
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
    const { route } = props;
    this.route = route;
  }

  componentDidMount() {
    // setting componentCount is ugly as anything
    if (this.props.state.loaded) {
      this.setState(
        Object.assign(
          {},
          this.props.state,
          {
            moduleComponentCount: this.props.state.modules[this.route.match.params.moduleId].field_lesson.length,
            visibleModuleComponent: 1,
            nextButtonDisabled: false
          }
        )
      ); 
    }
  }

  incrementVisible() {
    if (this.state.visibleModuleComponent < this.state.moduleComponentCount) {
      this.setState({
        visibleModuleComponent: ++this.state.visibleModuleComponent
      })
    }
  }

  decrementVisible() {
    if (this.state.visibleModuleComponent > 1) {
      this.setState({
        visibleModuleComponent: --this.state.visibleModuleComponent
      })
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
    if (!this.state) {
      return 'Loading...';
    }
    const moduleId = this.route.match.params.moduleId;
    const moduleData = this.state.modules[moduleId];
    if (!moduleData) {
      return <div>Module ID is not found</div>;
    }
    return (
      <Page>
        <h1>{moduleData.title}</h1>
        <div>
          Progress {this.state.visibleModuleComponent} / {this.state.moduleComponentCount}
        </div>
        {
          // TODO: might not use .field_lesson
          moduleData.field_lesson.map((moduleComponentId, i) => {
            return <ModuleComponent
              key={i}
              moduleComponent={this.state.moduleComponents[moduleComponentId]}
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
      </Page>
    )
  }

};