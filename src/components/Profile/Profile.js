// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import type {ReduxStatusType} from '../../types';

const Profile = ({status}: {status: ReduxStatusType}): Node => {
  return (
    <Page title={'Profile'}>
      <EditUserField
        label={'First name'}
        value={status.firstName} />
      <EditUserField
        label={'Last name'}
        value={status.lastName} />
      <EditUserField
        label={'Company'}
        value={status.company} />
      <EditUserField
        label={'Country'}
        value={status.country} />
      <br/>
      <EditLoginField />
    </Page>
  );
};

type EditFieldType = {
  label: string,
  value?: string
};

const EditUserField = ({
  label,
  value,
}: EditFieldType): Node => {
  return (
    <div>
      {label} <br/>
      {value && value} <br/>
      edit <br/>
      <input type="text" placeholder="Field to edit" />
      <input type="submit" value="Confirm" />
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

const mapDispatchToProps = (dispatch: any): {somethingLater: string} => ({
  somethingLater: 'here',
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

