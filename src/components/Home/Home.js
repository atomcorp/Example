// @flow
import React from 'react';
import type {Node} from 'react';
import Page from '../../containers/page/page.js';
import {Link} from 'react-router-dom';

const Home = (): Node => (
  <Page>
    <h1>Home</h1>
    <Link to={`/login`}>Login</Link>
    <br />
    <Link to={`/courses`}>Courses</Link>
  </Page>
);

export default Home;
