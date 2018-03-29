// Not actually a container!
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './page.module.css';
import HeaderContainer from '../../components/Header/Header';
import {Link} from 'react-router-dom';
// Add header links

class Page extends Component {
  render() {
    return (
      <div className={style.page}>
        <HeaderContainer />
        <div className={style.content}>
          {
            // TODO: scrap props title
            this.props.title && (
              <div className={style.title}>
                <h1>{this.props.title}</h1>
              </div>
            )
          }
          {this.props.children}
        </div>
        <div><Link to={'/language'}>Change the language</Link></div>
        <br/>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Page;
