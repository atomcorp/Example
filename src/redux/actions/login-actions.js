import {auth} from '../../firebase';
import {
  LOGIN,
} from './action-types.js';

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

export const login = ({email, pass}) => {
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

// Not sure this is necessary???
// const shouldLogin = (state) => {
//   if (state.isLoggedIn) {
//     return false;
//   }
//   return true;
// };

// const loginIfNecessary = () => {
//   return (dispatch, getState) => {
//     if (shouldLogin(getState())) {
//       return dispatch(login());
//     }
//   };
// };
