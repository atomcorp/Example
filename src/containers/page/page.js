// Not actually a container!
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Page extends Component {
  render() {
    return (
      <div className="page">
        <div><Link to="/">Cambridge Audio | Learn</Link></div>
        { this.props.children }
        <div> Footer </div>
        <br/>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node
};

export default Page;