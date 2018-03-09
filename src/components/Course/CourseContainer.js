import { connect } from 'react-redux';
import { Course } from './Course.js';

const getModuleProgression = (moduleProgression) => {
  return moduleProgression;
};

const getCourseStatuses = (coursesStatuses) => {
  return coursesStatuses;
};

const mapStateToProps = state => {
  return {
    moduleStatuses: getModuleProgression(state.moduleProgression),
    coursesStatuses: getCourseStatuses(state.coursesStatuses)
  }
};

const CourseContainer = connect(
  mapStateToProps
)(Course);

export default CourseContainer;