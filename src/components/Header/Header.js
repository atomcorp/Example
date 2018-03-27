// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../redux/actions/login-actions';
import styles from './Header.module.css';

type StatusType = {
  isLoggedIn: boolean,
  email: string
};

const Header = ({
  status,
  logout,
}: {status: StatusType, logout: () => void}): Node => {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/courses">Cambridge Audio | Learn</Link>
      <User
        isLoggedIn={status.isLoggedIn}
        email={status.email}
        logout={logout} />
    </div>
  );
};

const User = ({
  isLoggedIn,
  email,
  logout,
}: {isLoggedIn: boolean, email: string, logout: () => void}): Node => (
  <div className={styles.user}>
    {
      isLoggedIn
        ? <LoggedIn email={email} logout={logout} />
        : <LoggedOut />
    }
  </div>
);

const LoggedOut = (): Node => (
  <div>
    <Link className={styles.link} to="/register">Register</Link>
    <Link className={styles.link} to="/login">Login</Link>
  </div>
);

const LoggedIn = ({
  logout,
  email,
}: {logout: () => void, email: string}): Node => (
  <div className={styles.loggedIn}>
    <div>{email}</div>
    <button className={styles.logout} onClick={(): void => logout()}>
      Sign out
    </button>
  </div>
);

const mapStateToProps = (state: any): any => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch: any): any => ({
  logout: (): void => dispatch(logout()),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
