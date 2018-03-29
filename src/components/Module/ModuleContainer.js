import {connect} from 'react-redux';
import {ModuleLoader} from './Module';
import {moduleDone} from '../../redux/actions/action-creators.js';

const getModuleProgression = (moduleProgression) => moduleProgression;

const mapStateToProps = (state) => ({
  moduleStatuses: getModuleProgression(state.moduleProgression),
  resources: state.resources.data,
  loaded: state.resources.status === 'loaded' ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
  done: (id) => {
    dispatch(moduleDone(id));
  },
});

const ModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleLoader);

export default ModuleContainer;
