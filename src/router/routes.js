import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Courses } from '../components/Courses/Courses.js';
import { Course } from '../components/Course/Course.js';
import { Module } from '../components/Module/Module.js';
import { Assessment } from '../components/Assessment/Assessment.js';

const NoMatch = () => <div>404</div>;

const Routes = ({ resources }) => {
  return (
    <Router>
      <div>
        <h1>eLearning routes</h1>
        <ul>
          <li><Link to="/">Courses</Link></li>
          <li><Link to="/course/1998">Course</Link></li>
          <li><Link to="/module/2000">Module</Link></li>
          <li><Link to="/assessment/1998">Assessment</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
        <Switch>
          <Route path="/" exact component={() => (
            <Courses courses={resources.courses} />
          )} />
          <Route path="/course/:courseId" component={route => (
            <Course route={route} resources={resources} />
          )} />
          <Route path="/module/:moduleId" component={route => (
            <Module route={route} resources={resources} />
          )} />
          <Route path="/assessment/:courseId" component={route => (
            <Assessment route={route} resources={resources} />
          )} />
          <Route component={NoMatch}></Route>
        </Switch>
      </div>
    </Router>
  )
}

Routes.propTypes = {
  resources: PropTypes.object
}

export default Routes;