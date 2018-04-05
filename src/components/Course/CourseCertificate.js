// @flow
import React from 'react';
import type {Node} from 'react';
import {localisedCertificateEndpoint} from '../../config/config';

type CourseCertificateType = {
  email: string,
  t: (string) => string,
  courseId: string,
  language: string,
  firstName: string,
  lastName: string
};

const CourseCertificate = ({
  email,
  t,
  courseId,
  language,
  firstName,
  lastName,
}: CourseCertificateType): Node => {
  const handleClick = () => {
    postCertificateRequest({
      email,
      courseId,
      language,
      firstName,
      lastName,
    });
  };
  return (
    <div>
      <h4>{t('certificate')}</h4>
      <p>
        {t('congratulationsCompletingCourse')}
      </p>
      <button onClick={(): void => handleClick()}>
        {t('emailTo')} {email}
      </button>
    </div>
  );
};

type PostCertificateRequestType = {
  email: string,
  courseId: string,
  language: string,
  firstName: string,
  lastName: string
};

const postCertificateRequest = ({
  email,
  courseId,
  language,
  firstName,
  lastName,
}: PostCertificateRequestType) => {
  const body = {
    email: email,
    name: {
      first_name: firstName,
      last_name: lastName,
    },
    course: {
      nid: courseId,
    },
    language: language,
    country: 'gb',
  };
  const url = localisedCertificateEndpoint(language);
  req(url, body).then((res) => {
    // do something
  }).catch((err) => console.error(err));
};

type BodyType = {
  email: string,
  name: {
    first_name: string,
    last_name: string
  },
  course: {
    nid: string
  },
  language: string,
  country: 'gb'
};

const req = (url: string, body: BodyType): * => fetch(url, {
  body: JSON.stringify(body),
  cache: 'no-cache',
  method: 'POST',
  mode: 'cors',
  headers: {
    'content-type': 'application/json',
  },
});

export default CourseCertificate;
