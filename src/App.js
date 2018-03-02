import React, { Component } from 'react';
import { Courses } from './components/Courses/Courses.js';
import { Course } from './components/Course/Course.js';
import { Lessons } from './components/Lessons/Lessons.js';
import { store } from './store/store.js';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assessments: {},
      courses: {},
      lessons: {},
      modules: {},
      loaded: false
    }
  }

  componentDidMount() {
    store.fetchState().then(
      ({ assessments, courses, lessons, modules }) => {
        this.setState({ 
          assessments, 
          courses, 
          lessons, 
          modules,
          loaded: true 
        })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Courses courses={this.state.courses} />
        <Course state={
          Object.assign({}, this.state, { id: '1998'})
        } />
        <Lessons state={
          Object.assign({}, this.state, { lessons: [
            '1838', '1842', '1840'
          ] })
        } />
      </div>
    );
  }
}

export default App;
