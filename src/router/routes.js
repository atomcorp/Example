import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Courses } from '../components/Courses/Courses.js';
import { Course } from '../components/Course/Course.js';
import { Module } from '../components/Module/Module.js';
import { Assessment } from '../components/Assessment/Assessment.js';

const Home = () => <div> HOME </div>;

const Routes = ({state, temp}) => {
  return (
    <Router>
      <div>
        <h1>eLearning routes</h1>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/course">Course</Link></li>
          <li><Link to="/module">Module</Link></li>
          <li><Link to="/assessment">Assessment</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>
        <Route path="/courses" component={() => (
          <Courses courses={state.courses} />
        )} />
        <Route path="/course" component={() => (
          <Course state={state} courseId={ temp.courseId } />
        )} />
        <Route path="/module" component={() => (
          <Module state={state} moduleId={temp.moduleId} />
        )} />
        <Route path="/assessment" component={() => (
          <Assessment state={state} courseId={temp.courseId} />
        )} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  )
}

export default Routes;