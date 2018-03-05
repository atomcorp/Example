import React, { Component } from 'react';

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

export default Page;