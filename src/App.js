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
import {database} from './firebase/';
import type {
  MultiChoiceType,
  CourseType,
  LessonType,
  ModuleType,
} from './types.js';
import {LOGIN} from './redux/actions/action-types';
import {
  getFromLocalStorage,
  addToLocalStorage,
} from './utility/utility';

type ResourcesType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  components: {} | LessonType | MultiChoiceType,
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
    // if no language set default to English
    if (!getFromLocalStorage('lang')) {
      addToLocalStorage('lang', '');
    }
    resources(getFromLocalStorage('lang')).then(
      ({
        courses,
        components,
        modules,
      }: ResourcesType) => {
        this.resources = {
          courses,
          components,
          modules,
        };
      }
    ).then(() => {
      // check if user is logged in with our localStorage reference
      const userIdIfLoggedInAtLoad = getFromLocalStorage(LOGIN.SUCCESS);
      if (userIdIfLoggedInAtLoad) {
        return database.ref('/users/' + userIdIfLoggedInAtLoad)
          .once('value')
          .then((res: {val: any} ): {} => res.val())
          .then((state: any) => {
            this.setState({
              preLoadedState: state,
            });
          });
      }
      return;
    }).then(() => {
      this.setState({
        loaded: true,
      });
    });
  }

  render(): Node {
    if (!this.state.loaded) {
      return <div>Loading Cambridge Audio | Learn</div>;
    }
    return (
      <Routes
        resources={{}}
        store={configureStore(this.state.preLoadedState)} />
    );
  }
}

export default App;
