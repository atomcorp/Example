import { connect } from 'react-redux';
import { Course } from './Course.js';
import { setCourseStatus } from '../../redux/actions/action-creators.js';

const getModuleProgression = (moduleProgression) => {
  return moduleProgression;
};

const getCourseStatuses = (coursesStatuses) => {
  return coursesStatuses;
};

const getAssessmentProgression = (assessmentStatuses) => {
  return assessmentStatuses;
};

const mapStateToProps = state => {
  return {
    moduleStatuses: getModuleProgression(state.moduleProgression),
    coursesStatuses: getCourseStatuses(state.coursesStatuses),
    assessmentStatuses: getAssessmentProgression(state.assessmentStatuses)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCourseStatus: (status, course) => {
      dispatch(setCourseStatus({ status, course }));
    }
  }
};

const CourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);

export default CourseContainer;