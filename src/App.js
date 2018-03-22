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
    /*  */
    // get static learning data here
    Promise.all([
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
        }
      ),
      auth.onLogin((user: void) => {
        if (user && !this.state.loaded) {
          console.log('Loading profile');
          database.ref('/users/' + user.uid)
            .once('value')
            .then((res) => res.val())
            .then((state) => {
              this.setState({
                preLoadedState: state,
                loaded: true,
              });
            });
        } else {
          console.log('Don\'t bother');
          this.setState({
            loaded: true,
          });
        }
      }),
    ]).then((res) => console.log('done', res[1]));
  }

  componentWillUpdate() {
    // if (auth.getCurrentUser()) {
      
    // }
  }

  render(): Node {
    if (!this.state.loaded) {
      return <div>Loading Cambridge Audio | Learn</div>;
    }
    return (
      <Routes
        resources={this.resources}
        store={configureStore(this.state.preLoadedState)} />
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
