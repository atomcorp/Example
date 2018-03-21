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
    isLoggedIn: boolean
  }
};

type StateType = {
  redirectToReferrer: boolean
};

class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    // this.state = {
    //   redirectToReferrer: false,
    // };
  }
  handleClick = () => {
    this.props.onClick({
      email: 'tmsisatwork+1@gmail.com',
      pass: 'password',
    });
    // login({
    //   email: 'tmsisatwork+1@gmail.com',
    //   pass: 'password',
    // });
    // appAuth.authenticate(() => {
    //   this.setState({redirectToReferrer: true});
    // });
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
      </Page>
    );
  }
}

export default Login;
