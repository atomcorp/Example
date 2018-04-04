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
  country: string
};

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
    };
  }
  handleUserEdit = (key: string, event: Event) => {
    if (typeof event.target.value === 'string') {
      this.setState({
        [key]: event.target.value,
      });
    }
  }
  handleSubmit = (key: string) => {
    this.props.confirmUserEdit(key, this.state[key]);
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
            handleUserSubmission={this.handleSubmit} />
          <EditUserField
            label={'Last name'}
            stateKey={'lastName'}
            value={this.props.status.lastName}
            editedValue={this.state.lastName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit} />
          <EditUserField
            label={'Company'}
            stateKey={'company'}
            value={this.props.status.company}
            editedValue={this.state.company}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit} />
          <EditUserField
            label={'Country'}
            stateKey={'country'}
            value={this.props.status.country}
            editedValue={this.state.country}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit} />
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
  stateKey: string,
  handleUserEdit: (string, Event) => void,
  handleUserSubmission: (string) => void
};

const EditUserField = ({
  label,
  value,
  editedValue,
  stateKey,
  handleUserEdit,
  handleUserSubmission,
}: EditFieldType): Node => {
  return (
    <div>
      {label} <br/>
      {value && value} <br/>
      edit <br/>
      <form onSubmit={(e: Event) => {
        e.preventDefault();
        handleUserSubmission(stateKey);
      }}>
        <input
          onChange={(e: Event): void => handleUserEdit(stateKey, e)}
          type="text"
          value={editedValue} />
        <input type="submit" value="Confirm" />
      </form>
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

