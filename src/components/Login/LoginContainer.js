import {connect} from 'react-redux';
import Login from './Login';
import {login} from '../../redux/actions/login-actions';

const mapStateToProps = (state) => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (loginParams) => dispatch(login(loginParams)),
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
