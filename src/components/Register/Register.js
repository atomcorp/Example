// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page';
import {register} from '../../redux/actions/register-actions';
import styles from './Register.module.css';

type PropsType = {
  registrationError: string,
  attemptToRegister: ({
    email: string,
    pass: string
  }) => void,
  isLoggingIn: string,
  isLoggedIn: true,
  location: {
    state: {
      from: {
        pathname: string
      }
    }
  }
};

type StateType = {
  email: string,
  pass: string,
  confirmPass: string,
  passwordsMatch: boolean,
  confirmPasswordsIsDirty: boolean
};

class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      confirmPass: '',
      passwordsMatch: false,
      confirmPasswordsIsDirty: false,
    };
  }
  handleInput = (type: string, event: Event) => {
    if (typeof event.target.value === 'string') {
      this.setState({
        [type]: event.target.value,
        // confirmPasswordsIsDirty: !prevState.confirmPasswordsIsDirty && type === 'confirmPass' ? true : false,
        passwordsMatch: this.handleIfPasswordsMatch(),
      });
    }
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    if (this.state.pass !== this.state.confirmPass) {
      this.setState({
        confirmPasswordsIsDirty: true,
      });
      return;
    }
    this.props.attemptToRegister({
      email: this.state.email,
      pass: this.state.pass,
    });
  }
  handleIfPasswordsMatch(): boolean {
    const {
      pass,
      confirmPass,
    } = this.state;
    if (pass === confirmPass) {
      return true;
    }
    return false;
  }
  render(): Node {
    const {from} = this.props.location.state
      || {from: {pathname: `/courses`}};
    if (this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <Page>
        <div>
          <h1>Register</h1>
          {this.state.passwordsMatch ? '' : 'Passwords do not match'}
          {this.props.registrationError}
          <RegistrationForm
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            state={this.state}
            />
          {this.props.isLoggingIn ? 'Registering you...' : ''}
        </div>
      </Page >
    );
  }
}

const RegistrationForm = ({
  handleSubmit,
  handleInput,
  state,
}: {
  handleSubmit: (Event) => void,
  handleInput: (string, Event) => void,
  state: {
    email: string,
    pass: string,
    confirmPass: string,
    passwordsMatch: boolean,
    confirmPasswordsIsDirty: boolean
  }
}): Node => (
  <form onSubmit={handleSubmit}>
    <InputWithLabel
      label={'Email'}
      inputType={'email'}
      value={state.email}
      type={'text'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={'Password'}
      inputType={'pass'}
      value={state.pass}
      type={'password'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={'Confirm password'}
      inputType={'confirmPass'}
      value={state.confirmPass}
      type={'password'}
      placeholder={''}
      handleInput={handleInput}
      passwordsMatch={state.passwordsMatch}
      confirmPasswordsIsDirty={state.confirmPasswordsIsDirty} />
    <input type="submit" value="Register" />
  </form>
);

const InputWithLabel = ({
  label,
  inputType,
  value,
  type,
  placeholder,
  handleInput,
  ...props
}: {
  label: string,
  inputType: string,
  value: string,
  type: string,
  placeholder: string,
  handleInput: (string, Event) => void,
  props?: any,
  passwordsMatch?: boolean,
  confirmPasswordsIsDirty?: boolean
}): Node => (
  <label className={styles.inputBlock}>
    {label}:&nbsp;
    {
      // @FlowFixMe
      inputType === 'confirmPass'
      && props.confirmPasswordsIsDirty
      && !props.passwordsMatch
        ? 'Passwords do not match'
        : ''
    }
    <input
      onInput={(e: Event): void =>
        handleInput(inputType, e)
      }
      value={value}
      type={type}
      placeholder={placeholder} />
  </label>
);

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
