// Not actually a container!
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import style from './page.module.css';
import LogoutContainer from '../../components/Logout/Logout';

class Page extends Component {
  render() {
    return (
      <div className={style.page}>
        <div className={style.header}>
          <Link to="/">Cambridge Audio | Learn</Link>
          <LogoutContainer />
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


Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
