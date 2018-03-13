import {connect} from 'react-redux';
import {Course} from './Course.js';
import {setCourseStatus} from '../../redux/actions/action-creators.js';

const getModuleProgression = (moduleProgression) =>
  moduleProgression;

const getCourseStatuses = (coursesStatuses) =>
  coursesStatuses;

const getAssessmentProgression = (assessmentStatuses) =>
  assessmentStatuses;

const mapStateToProps = (state) => ({
  moduleStatuses: getModuleProgression(state.moduleProgression),
  coursesStatuses: getCourseStatuses(state.coursesStatuses),
  assessmentStatuses: getAssessmentProgression(state.assessmentStatuses),
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStatus: (status, course) => {
    dispatch(setCourseStatus({status, course}));
  },
});

const CourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);

export default CourseContainer;
