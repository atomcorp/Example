// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {register} from '../../redux/actions/register-actions';

type PropsType = {
  registrationError: string,
  attemptToRegister: ({
    email: string,
    pass: string
  }) => void,
  isLoggingIn: string
};

type StateType = {
  email: string,
  pass: string,
  confirmPass: string,
  error: string
};

class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      confirmPass: '',
      error: 'No errors',
    };
  }
  handleInput(type: string, event: {target: {value: string}}) {
    this.setState({
      [type]: event.target.value,
    });
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    if (this.state.pass !== this.state.confirmPass) {
      this.setState({
        error: 'Passwords do not match',
      });
      return;
    }
    this.props.attemptToRegister({
      email: this.state.email,
      pass: this.state.pass,
    });
  }
  render(): Node {
    return (
      <Page>
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            Email:
            <input
              onInput={(e: {target: {value: string}}): void =>
                this.handleInput('email', e)
              }
              value={this.state.email}
              type="text" placeholder="Email" />
            <br />
            Password:
            <input
              onInput={(e: {target: {value: string}}): void =>
                this.handleInput('pass', e)
              }
              value={this.state.pass}
              type="password" placeholder="Password" />
            <br />
            Confirm password:
            <input
              onInput={(e: {target: {value: string}}): void =>
                this.handleInput('confirmPass', e)
              }
              value={this.state.confirmPass}
              type="password" placeholder="Confirm password" />
            <br />
            {this.state.error}
            {this.props.registrationError}
            <input type="submit" value="Register" />
            {this.props.isLoggingIn ? 'Registering you...' : 'No reg'}
          </form>
        </div>
      </Page >
    );
  }
}

type LoginDataType = {
  email: string,
  pass: string
};

const mapStateToProps = (state: {status: ?{}}): ?{} => state.status;

const mapDispatchToProps = (
  dispatch: (register: () => void) => void
): {attemptToRegister: any} => ({
  attemptToRegister: (
    registerParams: LoginDataType
  ): void => dispatch(register(registerParams)),
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
