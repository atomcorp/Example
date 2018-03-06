import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  render() {
    return (
      <div className="page">
        <div> Header </div>
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