import {connect} from 'react-redux';
import Login from './Login';
import {loginIfNecessary} from '../../redux/actions/login-actions';

const mapStateToProps = (state) => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (loginParams) => dispatch(loginIfNecessary(loginParams)),
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
