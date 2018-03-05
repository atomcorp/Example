import React, { Component } from 'react';
import { Courses } from './components/Courses/Courses.js';
import { Course } from './components/Course/Course.js';
import { Module } from './components/Module/Module.js';
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
        <Courses courses={ this.state.courses } />
        <Course 
          state={ this.state } 
          courseId="1998" />
        <Module 
          state={ this.state } 
          moduleComponentIds={[
            '1838', '1842', '1840'
          ]} />
      </div>
    );
  }
}

export default App;
