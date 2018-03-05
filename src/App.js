import React, { Component } from 'react';
import Routes from './router/routes.js';

import { store } from './store/store.js';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assessments: {},
      courses: {},
      moduleComponents: {},
      modules: {},
      loaded: false
    }
  }

  componentDidMount() {
    store.fetchState().then(
      ({ assessments, courses, moduleComponents, modules }) => {
        this.setState({ 
          assessments, 
          courses, 
          moduleComponents, 
          modules,
          loaded: true 
        })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Routes state={ this.state } />
      </div>
    );
  }
}

export default App;
