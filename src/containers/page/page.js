// Not actually a container!
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import style from './page.module.css';
import {appAuth} from '../../config/config.js';

class Page extends Component {
  render() {
    return (
      <div className={style.page}>
        <div className={style.header}>
          <Link to="/">Cambridge Audio | Learn</Link>
          <Logout />
        </div>
        <div className={style.content}>
          {this.props.children}
        </div>
        {/* <div> Footer </div> */}
        <br/>
      </div>
    );
  }
}

const Logout = withRouter(
  ({history}) =>
    appAuth.isAuthenticated ? (
      <button
        onClick={() => {
          appAuth.signout(() => history.push('/'));
        }} >
        Sign out
      </button>
    ) : (
        <p>You are not logged in.</p>
      )
);

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
