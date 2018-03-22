import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {register} from '../../redux/actions/register-actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      confirmPass: '',
      error: 'No errors',
    };
  }
  handleInput(type, event) {
    this.setState({
      [type]: event.target.value,
    });
  }
  handleSubmit = (event) => {
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
  render() {
    return (
      <Page>
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            Email:
            <input
              onInput={(e) => this.handleInput('email', e)}
              value={this.state.email}
              type="text" placeholder="Email" />
            <br />
            Password:
            <input
              onInput={(e) => this.handleInput('pass', e)}
              value={this.state.pass}
              type="password" placeholder="Password" />
            <br />
            Confirm password:
            <input
              onInput={(e) => this.handleInput('confirmPass', e)}
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

const mapStateToProps = (state) => state.status;

const mapDispatchToProps = (dispatch) => ({
  attemptToRegister: (registerParams) => dispatch(register(registerParams)),
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
