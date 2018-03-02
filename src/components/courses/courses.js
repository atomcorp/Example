import React from 'react';
import Page from '../../containers/page/page.js';
import { coursesJson } from '../../config/config.js';

const data = fetch(coursesJson).then(res => res.json()).catch(err => console.log(err));
data.then(res => {
  var arr = Object.keys(res).map(course => Course(res[course]))
  console.log(arr)
  return arr;
})

const Course = (courseData) => {
  return (
    <div>
      { courseData.title }
    </div>
  );
};

export const Courses = () => {

  return (
    <Page>
      <h1>Data here</h1>
      {
        
      }
    </Page>
  );
};
