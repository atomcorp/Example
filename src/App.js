import React, { Component } from 'react';
import { Courses } from './components/courses/courses.js';
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
      </div>
    );
  }
}

export default App;
