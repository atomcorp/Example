// @flow
import React from 'react';
import type {Node} from 'react';
import Page from '../../containers/page/page.js';
import {clearUserData} from '../../api.js';
import {Link} from 'react-router-dom';

const Home = (): Node => (
  <Page>
    <h1>Home</h1>
    <Link to={`/login`}>Login</Link>
    <br />
    <Link to={`/courses`}>Courses</Link>
    <br/>
    <Link to={`/register`}>Register</Link>
    <br/>
    <Progress />
    <br/>
    <br/>
    <Reset />
  </Page>
);

const Progress = (): Node => (
  <div>
    <h4>Progress</h4>
    If user has started course will show here.<br/>
    It will show progress as a percentage.<br/>
    If user has not started a course, will be blank or something
  </div>
);

const Reset = (): Node => {
  return (
    <button onClick={() => {
      clearUserData();
    }}>
      Clear localStorage (debug)
  </button>
  );
};

export default Home;
