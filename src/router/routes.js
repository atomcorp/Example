// @flow
import React from "react";
import type { Node } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Courses } from '../components/Courses/Courses.js';
import { Course } from '../components/Course/Course.js';
import { Module } from '../components/Module/Module.js';
import { Assessment } from '../components/Assessment/Assessment.js';

const Home = (): Node => <div> HOME </div>;

type InitalStateType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  moduleComponents: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType,
  loaded: boolean
};

const Routes = ({ state }: InitalStateType): Node => {
  return (
    <Router>
      <div>
        <h1>eLearning routes</h1>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/course/1998">Course</Link></li>
          <li><Link to="/module/2000">Module</Link></li>
          <li><Link to="/assessment/1998">Assessment</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>
        <Route path="/courses" component={(): Node => (
          <Courses courses={state.courses} />
        )} />
        <Route path="/course/:courseId" component={(route: {}): Node => (
          <Course route={route} state={state} />
         )} />
        <Route path="/module/:moduleId" component={(route: {}): Node => (
          <Module route={route} state={state} />
        )} />
        <Route path="/assessment/:courseId" component={(route: {}): Node => (
          <Assessment route={route} state={state} />
        )} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  )
}

Routes.propTypes = {
  state: {
    assessments: {},
    courses: {},
    moduleComponents: {},
    modules: {}
  }
}

export default Routes;