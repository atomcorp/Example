import React, { Component } from 'react';
import Routes from './router/routes.js';

import { store } from './store/store.js';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.resources = {};
  }

  componentDidMount() {
    store.fetchState().then(
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
      return 'Loading app';
    }
    return (
      <div className="App">
        <Routes resources={this.resources} state={ this.resources } />
      </div>
    );
  }
}

export default App;
