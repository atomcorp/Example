import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import CoursesContainer from '../components/Courses/CoursesContainer.js';
import CourseContainer from '../components/Course/CourseContainer.js';
import { Module } from '../components/Module/Module.js';
import { Assessment } from '../components/Assessment/Assessment.js';

const NoMatch = () => <div>404</div>;

const ValidateModulePath = ({ route, resources}) => {
  // courseId is irrelevant to rendering Module, so we check
  // Course actually contains Module, else redirect to Module
  const { courseId, moduleId } = route.match.params;
  if (resources.courses[courseId].modules.includes(moduleId)) {
    return <Module route={route} resources={resources} />;
  }
  return <Redirect to={`/course/${courseId}`} />;
};

const Routes = ({ resources, store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={() => (
            <CoursesContainer courses={resources.courses} />
          )} />
          <Route path="/course/:courseId/assessment" component={route => (
            <Assessment route={route} resources={resources} />
          )} />
          <Route path="/course/:courseId/:moduleId" component={route => (
            <ValidateModulePath route={route} resources={resources} />
          )} />
          <Route path="/course/:courseId" component={route => (
            <CourseContainer route={route} resources={resources} />
          )} />
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    </Provider>
  )
}

Routes.propTypes = {
  resources: PropTypes.object,
  store: PropTypes.object
}

ValidateModulePath.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object
}

export default Routes;