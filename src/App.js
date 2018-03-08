/**
 * This loads the entire project,
 * it should do as LITTLE as possible
 */
import React, { Component } from 'react';
import Routes from './router/routes.js';
import { resources } from './api.js';

import { createStore } from 'redux';
import { learnApp, coursesStatuses } from './redux/reducers/reducers.js';

import {
  SET_COURSE_STATUS,
  CourseStatuses
} from './redux/actions/action-types.js';
import { setCourseStatus } from './redux/actions/action-creators.js';

const initialStore = {
  coursesStatuses: {
    'edge': CourseStatuses.NOT_STARTED
  }
};

let store = createStore(learnApp, initialStore);

console.log(store.getState());
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
store.dispatch(setCourseStatus({
  status: CourseStatuses.STARTED,
  course: 'edge'
}));
store.dispatch(setCourseStatus({
  status: CourseStatuses.COMPLETED,
  course: 'edge'
}));
unsubscribe();

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
