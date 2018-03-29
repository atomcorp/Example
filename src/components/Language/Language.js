// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {chooseLanguage} from '../../redux/actions/action-creators';

type PropsType = {
  language: string,
  changeLanguage: string => void
};

const Language = ({language, changeLanguage}: PropsType): Node => (
  <Page>
    <h2>Current language is {language}</h2>
    <h4>Please choose a language: </h4>
    <ul>
      <LanguageButton changeLanguage={changeLanguage} lang="English" iso="en" />
      <LanguageButton changeLanguage={changeLanguage} lang="French" iso="fr" />
      <LanguageButton changeLanguage={changeLanguage} lang="Spanish" iso="es" />
      <LanguageButton changeLanguage={changeLanguage} lang="German" iso="de" />
    </ul>
    <button>Confirm</button>
  </Page>
);

type LanguageButtonType = {
  lang: string,
  iso: string,
  changeLanguage: string => void
};

const LanguageButton = ({
  lang,
  iso,
  changeLanguage,
}: LanguageButtonType): Node => (
  <li onClick={(e: Event): void => changeLanguage(iso)}>
    {lang}
  </li>
);

const mapStateToProps = (state: any): {language: string} => ({
  language: state.status.language,
});

const mapDispatchToProps = (dispatch: any): any => ({
  changeLanguage: (
    language: string
  ): void => dispatch(chooseLanguage(language)),
});

const LanguageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);

export default LanguageContainer;
