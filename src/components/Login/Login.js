// @flow
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page.js';
import translate from '../../config/text';
import type {TranslateType} from '../../types';
import defaultStyle from '../../styles/default.module.css';
import formStyle from '../../styles/form.module.css';

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
  translate: TranslateType
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
      <Page title={this.translate('signIn')}>
        <div className={defaultStyle.content}>
          <form className={formStyle.form} onSubmit={this.handleSubmit}>
            {
              this.props.status.error
                ? <div className={formStyle.errors}>
                    {this.props.status.error}
                  </div>
                : ''
            }
            <label className={formStyle.label}>
              {this.translate('email')}:&nbsp;
              <input
                type="text"
                value={this.state.email}
                className={formStyle.input}
                onInput={
                  (e: {target: {value: string}}): void =>
                    this.handleInput('email', e)
                } />
            </label>
            <label className={formStyle.label}>
              {this.translate('password')}:&nbsp;
              <input
                type="password"
                value={this.state.pass}
                className={formStyle.input}
                onInput={
                  (e: {target: {value: string}}): void =>
                    this.handleInput('pass', e)
                } />
            </label>
            <input
              className={formStyle.button}
              type="submit"
              value={this.translate('signIn')} />
          </form>
          {this.props.status.isLoggingIn ? this.translate('loggingIn') : ''}
        </div>
      </Page>
    );
  }
}

export default Login;
