import React from 'react';
import {connect} from 'react-redux';
import {appAuth} from '../../config/auth.js';
import {Link, withRouter} from 'react-router-dom';

const Logout = withRouter(
  ({history, status}) => {
    return status.isLoggedIn
    ? (
      <button
        onClick={() => {
          appAuth.signout(() => history.push('/'));
        }} >
        Sign out
      </button>
    ) : (
        <Link to="/login">Login</Link>
      );
  }
);

const mapStateToProps = (state) => ({
  status: state.status,
});

const LogoutContainer = connect(
  mapStateToProps
)(Logout);

export default LogoutContainer;
