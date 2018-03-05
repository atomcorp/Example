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
            visibleModuleComponent: 1
          }
        )
      ); 
    }
  }

  incrementVisibleModuleComponent() {
    if (this.state.visibleModuleComponent < this.state.moduleComponentCount) {
      this.setState({
        visibleModuleComponent: ++this.state.visibleModuleComponent
      })
    }
  }

  decrementVisibleModuleComponent() {
    if (this.state.visibleModuleComponent > 1) {
      this.setState({
        visibleModuleComponent: --this.state.visibleModuleComponent
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
        {
          // TODO: not use .field_lesson
          moduleData.field_lesson.map((moduleComponentId, i) => {
            return <ModuleComponent
              key={i}
              moduleComponent={this.state.moduleComponents[moduleComponentId]}
              thisComponent={i + 1}
              isVisibleComponent={this.state.visibleModuleComponent} />
          })
        }
        <button onClick={() => this.decrementVisibleModuleComponent()}>Prev</button>
        <button onClick={() => this.incrementVisibleModuleComponent()}>Next</button>
    </Page>
    )
  }

};