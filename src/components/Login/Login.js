// @flow
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page.js';
import translate from '../../config/text';

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
    error: string,
    language: string
  }
};

type StateType = {
  email: string,
  pass: string
};

class Login extends Component<PropsType, StateType> {
  translate: (string) => string
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
    this.translate = translate(this.props.status.language);
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.attemptLogin({
      email: this.state.email,
      pass: this.state.pass,
    });
  }
  handleInput(type: string, event: {target: {value: string}}) {
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
        <h1>{this.translate('signIn')}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.email}
            onInput={
              (e: {target: {value: string}}): void =>
                this.handleInput('email', e)
              }
            placeholder={this.translate('email')} />
          <input
            type="password"
            value={this.state.pass}
            onInput={
              (e: {target: {value: string}}): void =>
                this.handleInput('pass', e)
              }
            placeholder={this.translate('password')} />
          <input type="submit" value="Login" />
        </form>
        {this.props.status.isLoggingIn ? this.translate('loggingIn') : ''}
        {this.props.status.error ? this.props.status.error : ''}
        <br />
        <div>
          User: tmsisatwork+1@gmail.com <br />
          Password: password
        </div>
      </Page>
    );
  }
}

export default Login;
