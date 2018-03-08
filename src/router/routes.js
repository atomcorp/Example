import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Courses } from '../components/Courses/Courses.js';
import { Course } from '../components/Course/Course.js';
import { Module } from '../components/Module/Module.js';
import { Assessment } from '../components/Assessment/Assessment.js';

const NoMatch = () => <div>404</div>;

const checkModuleInCourse = (moduleId, courseId, courses) => 
  courses[courseId].modules.includes(moduleId);

const Routes = ({ resources }) => {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={() => (
            <Courses courses={resources.courses} />
          )} />
          <Route path="/course/:courseId/assessment" component={route => (
            <Assessment route={route} resources={resources} />
          )} />
          <Route path="/course/:courseId/:moduleId" component={route => {
            // courseId is irrelevant to Module, so we check
            // Course actually contains Module, else redirect to Module
            const { courseId, moduleId } = route.match.params;
            if (checkModuleInCourse(moduleId, courseId, resources.courses)) {
              return <Module route={route} resources={resources} />;
            }
            return <Redirect to={`/course/${courseId}`} />;
          }} />
          <Route path="/course/:courseId" component={route => (
            <Course route={route} resources={resources} />
          )} />
          <Route component={NoMatch}></Route>
        </Switch>
    </Router>
  )
}

Routes.propTypes = {
  resources: PropTypes.object
}

export default Routes;