// @flow
/**
 * This loads the entire project,
 * it should do as LITTLE as possible
 */
import React, {Component} from 'react';
import type {Node} from 'react';
import Routes from './router/routes.js';
import {resources} from './api.js';
import configureStore from './redux/store/configureStore.js';
import {auth, database} from './firebase/';
// import {postUserData} from './api.js';
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
  loaded: boolean,
  preLoadedState: ?{} | typeof undefined
};

class App extends Component<void, StateType> {
  resources: {} | ResourcesType;
  constructor() {
    super();
    this.state = {
      loaded: false,
      preLoadedState: undefined,
    };
    this.resources = {};
  }

  componentDidMount() {
    auth.onLogin((user: void) => {
      if (user) {
        // TODO:
        // 1. If the user is already logged in via
        //    Firebase Authentication, get their ID.
        // 2. Grab all the data associated with it
        //    from Firebase Database and pass
        //    to Redux (aka configureStore(state),
        //    else just leave 'undefined'
        database.ref('/users/' + user.uid)
          .once('value')
          .then((res) => res.val())
          .then((state) => {
            console.log(state);
            this.setState({
              preLoadedState: state,
            });
          });
      }
    });
    // get static learning data here
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
      <Routes
        resources={this.resources}
        store={configureStore({status: this.state.preLoadedState})} />
    );
  }
}

// Anytime redux is updated, this gets the state
// State then gets posted whereever
// store.subscribe((): {
//   coursesStatuses: {},
//   moduleProgression: {},
//   assessmentStatuses: {}
// } => postUserData(store.getState()));

export default App;
