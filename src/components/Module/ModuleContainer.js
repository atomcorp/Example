import { connect } from 'react-redux';
import { Module } from './Module';
import { moduleDone } from '../../redux/actions/action-creators.js'; 

const getModuleProgression = (moduleProgression) => {
  return moduleProgression;
};

const mapStateToProps = state => {
  return {
    moduleStatuses: getModuleProgression(state.moduleProgression)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    done: (id) => {
      dispatch(moduleDone(id));
    }
  }
};

const ModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);

export default ModuleContainer;
