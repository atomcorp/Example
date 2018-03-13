import {connect} from 'react-redux';
import {Module} from './Module';
import {moduleDone} from '../../redux/actions/action-creators.js';

const getModuleProgression = (moduleProgression) => moduleProgression;

const mapStateToProps = (state) => ({
  moduleStatuses: getModuleProgression(state.moduleProgression),
});

const mapDispatchToProps = (dispatch) => ({
  done: (id) => {
    dispatch(moduleDone(id));
  },
});

const ModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);

export default ModuleContainer;
