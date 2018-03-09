import { connect } from 'react-redux';
import { Courses } from './Courses.js';
import { setCourseStatus } from '../../redux/actions/action-creators.js';

const getCourseStatuses = (coursesStatuses) => {
  return coursesStatuses;
};

const mapStateToProps = state => {
  return {
    coursesStatuses: getCourseStatuses(state.coursesStatuses)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (status, course) => {
      dispatch(setCourseStatus({status, course}));
    }
  }
};

const UpdatedCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

export default UpdatedCourses;