import DOWNLOAD_RESOURCES from './action-types';
import {resources} from './api.js';

const resourcesRequest = () => ({
  type: DOWNLOAD_RESOURCES.REQUEST,
});

const resourcesSuccess = (resources) => ({
  type: DOWNLOAD_RESOURCES.SUCCESS,
  resources,
});

const resourcesFailure = (error) => ({
  type: DOWNLOAD_RESOURCES.FAILURE,
  error,
});

const havePreferredLanguage = (state) => {
  if (state.status.language) {
    return state.status.language;
  }
  return 'en';
};

export const downloadResourcesInPreferredLanguage = () => {
  return (dispatch, getState) => {
    dispatch(resourcesRequest());
    resources(havePreferredLanguage(getState()))
      .then((response) => {
        dispatch(resourcesSuccess(response));
      })
      .catch((err) => {
        dispatch(resourcesFailure(err));
      });
  };
};
