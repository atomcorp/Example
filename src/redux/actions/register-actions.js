import {REGISTER} from './action-types';
import {auth} from '../../firebase';
import {loginIfNecessary} from './login-actions';

const registerRequest = () => ({
  type: REGISTER.REQUEST,
});

const registerSuccess = ({id, email}) => ({
  type: REGISTER.SUCCESS,
  id,
  email,
});

const registerFailure = (registrationError) => ({
  type: REGISTER.FAILURE,
  registrationError,
});

export const register = ({email, pass}) => {
  return (dispatch, getState) => {
    dispatch(registerRequest());
    return auth
      .signUp(email, pass)
      .then((user) => {
        dispatch(registerSuccess({
          id: user.uid,
          email: user.email,
        }));
        return user;
      })
      .then((user) => {
        // dispatch to Firebase Storage
        // getState()
        return user;
      })
      .then((res) => {
        // sign in with the App
        dispatch(loginIfNecessary({
          email,
          pass,
        }));
      })
      .catch((err) => dispatch(registerFailure(err.message)));
  };
};

