// @flow
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page.js';

type PropsType = {
  location: {
    state: {
      from: {
        pathname: string
      }
    }
  },
  attemptLogin: ({
    email: string,
    pass: string
  }) => void,
  status: {
    isLoggedIn: boolean,
    isLoggingIn: boolean,
    error: string
  }
};

class Login extends Component<PropsType, void> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.attemptLogin({
      email: this.state.email,
      pass: this.state.pass,
    });
    // email: 'tmsisatwork+1@gmail.com',
    // pass: 'password',
  }
  handleInput(type: string, event: Event) {
    this.setState({
      [type]: event.target.value,
    });
  }
  render(): * {
    const {from} = this.props.location.state
      || {from: {pathname: `/courses`}};
    if (this.props.status.isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <Page>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.email}
              onInput={(e: Event): void => this.handleInput('email', e)}
              placeholder="Email" />
            <input
              type="password"
              value={this.state.password}
              onInput={(e: Event): void => this.handleInput('pass', e)}
              placeholder="Password" />
            <input type="submit" value="Login" />
          </form>
          {this.props.status.isLoggingIn ? 'Logging in...' : ''}
          {this.props.status.error ? this.props.status.error : ''}
      </Page>
    );
  }
}

export default Login;
