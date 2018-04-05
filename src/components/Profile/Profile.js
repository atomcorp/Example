// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import type {ReduxStatusType} from '../../types';
import defaultStyles from '../../styles/default.module.css';
import {changeUserDetails} from '../../redux/actions/action-creators';
import countryJson from '../../utility/countries.json';

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
  handleUserEdit = (key: KeyType, value: string) => {
    if (typeof value === 'string') {
      this.setState({
        [key]: value,
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
        userEditIsVisible: Object.assign({}, prevState.userEditIsVisible, {
          [key]: !prevState.userEditIsVisible[key],
        }),
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
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.firstName}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.firstName}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'firstName'} />
            } />
          <EditUserField
            label={'Last name'}
            stateKey={'lastName'}
            value={this.props.status.lastName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.lastName}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.lastName}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'lastName'} />
            }/>
          <EditUserField
            label={'Company'}
            stateKey={'company'}
            value={this.props.status.company}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.company}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.company}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'company'} />
            } />
          <EditUserField
            label={'Country'}
            stateKey={'country'}
            value={countryJson[this.props.status.country]}
            editedValue={this.state.country}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.country}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            editType={
              (): Node =>
                <SelectCountryForUser
                  value={this.state.country}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'country'} />
            } />
          <br />
          <EditLoginField />
        </div>
      </Page>
    );
  }
}

type InputForUserType = {
  type: string,
  handleUserEdit: (KeyType, string) => void,
  stateKey: KeyType,
  value: string
};

const InputForUser = ({
  type,
  handleUserEdit,
  stateKey,
  value,
}: InputForUserType): Node => (
  <input
    // $FlowFixMe
    onChange={(e: Event): void => handleUserEdit(stateKey, e.target.value)}
    type={type}
    value={value}
    required />
);

type SelectCountryForUserType = {
  handleUserEdit: (KeyType, string) => void,
  stateKey: KeyType,
  value: string
};

const SelectCountryForUser = ({
  handleUserEdit,
  stateKey,
  value,
}: SelectCountryForUserType): Node => (
    <select
      onChange={(e: Event): void =>// $FlowFixMe
        handleUserEdit(stateKey, e.target.value)
      }
      defaultValue={value}
    >
    {
      Object.keys(countryJson).map((iso: string): Node => (
        <option key={iso} value={iso}>
          {countryJson[iso]}
        </option>
      ))
    }
  </select>
);

type EditFieldType = {
  label: string,
  value?: string,
  stateKey: KeyType,
  handleUserSubmission: (KeyType) => void,
  userEditIsVisible: boolean,
  handleUserEditIsVisible: (
    KeyType
  ) => void,
  editType: () => Node
};

const EditUserField = ({
  label,
  value,
  stateKey,
  handleUserSubmission,
  userEditIsVisible,
  handleUserEditIsVisible,
  editType,
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
            {
              editType()
            }
            <input type="submit" value="Confirm" />
          </form>
        )
      }
    </div>
  );
};

// const EditUserSelect = () => {

// };

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

