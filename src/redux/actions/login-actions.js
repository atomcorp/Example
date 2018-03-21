import {auth} from '../../firebase';
import {
  LOGIN,
  LOGOUT,
} from './action-types.js';

const logoutSuccess = () => ({
  type: LOGOUT,
});

export const logout = () => {
  return (dispatch) => {
    return auth.signOut().then((res) => dispatch(logoutSuccess()));
  };
};

const loginRequest = () => ({
  type: LOGIN.REQUEST,
});

const loginSuccess = ({id, email}) => ({
  type: LOGIN.SUCCESS,
  id,
  email,
});

const loginFailure = (error) => ({
  type: LOGIN.FAILURE,
  error,
});

const login = ({email, pass}) => {
  return (dispatch) => {
    dispatch(loginRequest());
    return auth
      .signIn(email, pass)
      .then(({user}) => {
        dispatch(loginSuccess({
          id: user.uid,
          email: user.email,
        }));
      })
      .catch((err) => dispatch(loginFailure(err.message)));
  };
};

const shouldLogin = (state) => {
  if (state.status.isLoggedIn) {
    return false;
  }
  return true;
};

export const loginIfNecessary = (loginParams) => {
  return (dispatch, getState) => {
    if (shouldLogin(getState())) {
      return dispatch(login(loginParams));
    }
  };
};
