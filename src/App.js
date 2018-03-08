/**
 * This loads the entire project,
 * it should do as LITTLE as possible
 */
import React, { Component } from 'react';
import Routes from './router/routes.js';

import { resources } from './api.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user: {}
    };
    this.resources = {};
  }

  componentDidMount() {
    resources.then(
      ({ assessments, courses, moduleComponents, modules }) => {
        this.resources = {
          assessments,
          courses,
          moduleComponents,
          modules,
        };
        this.setState({ 
          loaded: true 
        })
      }
    );
  }

  render() {
    if (!this.state.loaded) {
      return 'Loading Cambridge Audio | Learn';
    }
    return (
      <Routes resources={this.resources} state={this.resources} />
    );
  }
}

export default App;
