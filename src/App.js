// @flow
/**
 * This loads the entire project,
 * it should do as LITTLE as possible
 */
import React, {Component} from 'react';
import type {Node} from 'react';
import Routes from './router/routes.js';
import {resources} from './api.js';
import {store} from './redux/store/store.js';
import {postUserData} from './api.js';
import type {
  MultiChoiceType,
  CourseType,
  LessonType,
  ModuleType,
} from './types.js';

type ResourcesType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  moduleComponents: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType
};

type StateType = {
  loaded: boolean
};

class App extends Component<void, StateType> {
  resources: {} | ResourcesType;
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this.resources = {};
  }

  componentDidMount() {
    resources.then(
      ({
        assessments,
        courses,
        moduleComponents,
        modules,
      }: ResourcesType) => {
        this.resources = {
          assessments,
          courses,
          moduleComponents,
          modules,
        };
        this.setState({
          loaded: true,
        });
      }
    );
  }

  render(): Node {
    if (!this.state.loaded) {
      return <div>Loading Cambridge Audio | Learn</div>;
    }
    return (
      <Routes resources={this.resources} store={store} />
    );
  }
}

// Anytime redux is updated, this gets the state
// State then gets posted whereever
store.subscribe((): {
  coursesStatuses: {},
  moduleProgression: {},
  assessmentStatuses: {}
} => postUserData(store.getState()));

export default App;
