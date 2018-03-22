import {REGISTER} from './action-types';
import {auth, database} from '../../firebase';
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
        // sign in with the App
        dispatch(loginIfNecessary({
          email,
          pass,
        }));
        return user;
      })
      // .then((user) => {
      //   // dispatch to Firebase Storage
      //   // getState()
      //   database.ref('users/' + user.uid).set(getState());
      // })
      .catch((err) => dispatch(registerFailure(err.message)));
  };
};

