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
    <Reset />
  </Page>
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
