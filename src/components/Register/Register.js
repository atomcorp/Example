// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page';
import {register} from '../../redux/actions/register-actions';
import defaultStyle from '../../styles/default.module.css';
import formStyle from '../../styles/form.module.css';
import translate from '../../config/text';
import type {TranslateType} from '../../types';

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
  },
  language: string
};

type StateType = {
  email: string,
  pass: string
};

class Register extends Component<PropsType, StateType> {
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
    this.t = translate(this.props.language);
  }
  handleInput = (type: string, event: Event) => {
    if (typeof event.target.value === 'string') {
      this.setState({
        [type]: event.target.value,
      });
    }
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.attemptToRegister({
      email: this.state.email,
      pass: this.state.pass,
    });
  }
  render(): Node {
    const {from} = this.props.location.state
      || {from: {pathname: `/courses`}};
    if (this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <Page title={this.t('register')}>
        <div className={defaultStyle.content}>
          <RegistrationForm
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            state={this.state}
            errors={this.props.registrationError}
            t={this.t} />
          {this.props.isLoggingIn ? 'Registering you...' : ''}
        </div>
      </Page >
    );
  }
}

type RegistrationFormType = {
  handleSubmit: (Event) => void,
  handleInput: (string, Event) => void,
  state: {
    email: string,
    pass: string
  },
  errors: string,
  t: TranslateType
};

const RegistrationForm = ({
  handleSubmit,
  handleInput,
  state,
  errors,
  t,
}: RegistrationFormType): Node => (
  <form className={formStyle.form} onSubmit={handleSubmit}>
      {
        errors &&
        <div className={formStyle.errors}>
          {errors}
        </div>
      }
    <InputWithLabel
      label={t('email')}
      inputType={'email'}
      value={state.email}
      type={'text'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={t('password')}
      inputType={'pass'}
      value={state.pass}
      type={'password'}
      placeholder={''}
      handleInput={handleInput} />
    <input className={formStyle.button} type="submit" value={t('register')} />
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
  <label className={formStyle.label}>
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
      className={formStyle.input}
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
