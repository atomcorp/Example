// @flow
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page.js';
import {appAuth} from '../../config/config.js';

type PropsType = {
  location: {
    state: string
  }
};

type StateType = {
  redirectToReferrer: boolean
};

class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
  }
  handleClick = () => {
    appAuth.authenticate(() => {
      this.setState({redirectToReferrer: true});
    });
  }
  render(): * {
    const {from} = this.props.location.state
      || {from: {pathname: '/courses'}};
    const {redirectToReferrer} = this.state;
      if (redirectToReferrer || appAuth.isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Page>
          <h1>Login</h1>
          <button onClick={this.handleClick}>Login</button>
      </Page>
    );
  }
}

export default Login;
