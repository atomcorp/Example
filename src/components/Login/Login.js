// @flow
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page.js';

// USAGE
// import {auth} from '../../firebase';
// console.log(auth);
// auth.signUp('tmsisatwork+1@gmail.com', 'password')
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// auth.signIn('tmsisatwork+1@gmail.com', 'password')
//  .then(res => console.log(res));

type PropsType = {
  location: {
    state: {
      from: {
        pathname: string
      }
    }
  },
  onClick: ({
    email: string,
    pass: string
  }) => void,
  status: {
    isLoggedIn: boolean,
    isLoggingIn: boolean
  }
};

class Login extends Component<PropsType, void> {
  handleClick = () => {
    this.props.onClick({
      email: 'tmsisatwork+1@gmail.com',
      pass: 'password',
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
          <button onClick={this.handleClick}>Login</button>
          {this.props.status.isLoggingIn ? 'Logging in...' : ''}
      </Page>
    );
  }
}

export default Login;
