import { connect } from 'react-redux';
import { Assessment } from './Assessment';
import { assessmentDone } from '../../redux/actions/action-creators.js';

const getAssessmentProgression = (assessmentStatuses) => {
  return assessmentStatuses;
};

const mapStateToProps = state => {
  return {
    assessmentStatuses: getAssessmentProgression(state.assessmentStatuses)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    done: (id) => {
      dispatch(assessmentDone(id));
    }
  }
};

const AssessmentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Assessment);

export default AssessmentContainer;