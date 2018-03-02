import React from 'react';
import Page from '../../containers/page/page.js';
import { baseUrl } from '../../config/config.js';

const data = fetch(`${baseUrl}/api/courses`).then(res => res.json).catch(err => console.log(err));
data.then(res => console.log(res));
export const Courses = () => {

  return (
    <Page>
      <h1>Data here</h1>
    </Page>
  );
};
