import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../redux/actions/login-actions';
import styles from './Header.module.css';

const Header = ({status, logout}) => {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/">Cambridge Audio | Learn</Link>
      <Navigation isLoggedIn={status.isLoggedIn} />
      <User isLoggedIn={status.isLoggedIn} email={status.email} logout={logout} />
    </div>
  );
};

const Navigation = ({isLoggedIn}) => (
  isLoggedIn
    ? <Link className={styles.link} to="/courses">Courses</Link>
    : null
);

const User = ({isLoggedIn, email, logout}) => (
  <div className={styles.user}>
    {
      isLoggedIn
        ? <LoggedIn email={email} logout={logout} />
      : <LoggedOut />
    }
  </div>
);

const LoggedOut = () => (
  <div>
    <Link className={styles.link} to="/register">Register</Link>
    <Link className={styles.link} to="/login">Login</Link>
  </div>
);

const LoggedIn = ({logout, email}) => (
  <div className={styles.loggedIn}>
    <div>{email}</div>
    <button className={styles.logout} onClick={() => logout()}>
      Sign out
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
