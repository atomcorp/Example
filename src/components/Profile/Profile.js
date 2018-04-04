// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import type {ReduxStatusType} from '../../types';

const Profile = (): Node => {
  return (
    <Page title={'Profile'}>
      Profile
    </Page>
  );
};

const mapStateToProps = ({status}: any): ReduxStatusType => status;

const mapDispatchToProps = (dispatch: any): {somethingLater: string} => ({
  somethingLater: 'here',
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

