// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import type {ReduxStatusType} from '../../types';
import defaultStyles from '../../styles/default.module.css';
import {changeUserDetails} from '../../redux/actions/action-creators';

type StateType = {
  firstName: string,
  lastName: string,
  company: string,
  country: string,
  userEditIsVisible: {
    firstName: boolean,
    lastName: boolean,
    company: boolean,
    country: boolean
  }
};

type KeyType = 'firstName' | 'lastName' | 'company' | 'country';

type PropsType = {
  status: ReduxStatusType,
  confirmUserEdit: (string, string) => void
};

class Profile extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      firstName: this.props.status.firstName,
      lastName: this.props.status.lastName,
      company: this.props.status.company,
      country: this.props.status.country,
      userEditIsVisible: {
        firstName: false,
        lastName: false,
        company: false,
        country: false,
      },
    };
  }
  handleUserEdit = (key: KeyType, event: Event) => {
    if (typeof event.target.value === 'string') {
      this.setState({
        [key]: event.target.value,
      });
    }
  }
  handleSubmit = (key: KeyType) => {
    if (this.state[key] !== '') {
      this.props.confirmUserEdit(key, this.state[key]);
      this.handleUserEditIsVisible(key);
    }
  }
  handleUserEditIsVisible = (
    key: KeyType
  ) => {
    this.setState((prevState: StateType): StateType => (
      Object.assign({}, prevState, {
        userEditIsVisible: {
          [key]: !prevState.userEditIsVisible[key],
        },
      })
    ));
  }
  render(): * {
    return (
      <Page title={'Profile'}>
        <div className={defaultStyles.content}>
          <EditUserField
            label={'First name'}
            stateKey={'firstName'}
            value={this.props.status.firstName}
            editedValue={this.state.firstName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.firstName}
            handleUserEditIsVisible={this.handleUserEditIsVisible} />
          <EditUserField
            label={'Last name'}
            stateKey={'lastName'}
            value={this.props.status.lastName}
            editedValue={this.state.lastName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.lastName}
            handleUserEditIsVisible={this.handleUserEditIsVisible} />
          <EditUserField
            label={'Company'}
            stateKey={'company'}
            value={this.props.status.company}
            editedValue={this.state.company}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.company}
            handleUserEditIsVisible={this.handleUserEditIsVisible} />
          <EditUserField
            label={'Country'}
            stateKey={'country'}
            value={this.props.status.country}
            editedValue={this.state.country}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.country}
            handleUserEditIsVisible={this.handleUserEditIsVisible} />
          <br />
          <EditLoginField />
        </div>
      </Page>
    );
  }
}

type EditFieldType = {
  label: string,
  value?: string,
  editedValue: string,
  stateKey: KeyType,
  handleUserEdit: (KeyType, Event) => void,
  handleUserSubmission: (KeyType) => void,
  userEditIsVisible: boolean,
  handleUserEditIsVisible: (
    KeyType
  ) => void
};

const EditUserField = ({
  label,
  value,
  editedValue,
  stateKey,
  handleUserEdit,
  handleUserSubmission,
  userEditIsVisible,
  handleUserEditIsVisible,
}: EditFieldType): Node => {
  return (
    <div>
      {label} <br/>
      {value && value} <br/>
      <button onClick={(): void => handleUserEditIsVisible(stateKey)}>
        edit
      </button>
      {
        userEditIsVisible && (
          <form onSubmit={(e: Event) => {
            e.preventDefault();
            handleUserSubmission(stateKey);
          }}>
            <input
              onChange={(e: Event): void => handleUserEdit(stateKey, e)}
              type="text"
              value={editedValue}
              required />
            <input type="submit" value="Confirm" />
          </form>
        )
      }
    </div>
  );
};

const EditLoginField = (): Node => (
  <div>
    Change Email and Password
  </div>
);

const mapStateToProps = (state: any): {status: ReduxStatusType} => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch: any): {confirmUserEdit: any} => ({
  confirmUserEdit: (key: string, value: string): any =>
    dispatch(changeUserDetails(key, value)),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

