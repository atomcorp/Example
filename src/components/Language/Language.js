// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {chooseLanguage} from '../../redux/actions/action-creators';

type PropsType = {
  language: string,
  changeLanguage: string => void
};
type StateType = {
  currentLang: string
};

class Language extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentLang: this.props.language,
    };
  }
  handleClick() {
    this.props.changeLanguage(this.state.currentLang);
  }
  switchLanguage = (iso) => {
    this.setState({
      currentLang: iso
    });
  }
  render(): * {
    return (
      <Page>
        <h2>Current site language is {this.props.language}</h2>
        <h3>Current page lang is {this.state.currentLang}</h3>
        <h4>Please choose a language: </h4>
        <ul>
          <LanguageButton switchLanguage={this.switchLanguage} lang="English" iso="en" />
          <LanguageButton switchLanguage={this.switchLanguage} lang="French" iso="fr" />
          <LanguageButton switchLanguage={this.switchLanguage} lang="Spanish" iso="es" />
          <LanguageButton switchLanguage={this.switchLanguage} lang="German" iso="de" />
        </ul>
        <button onClick={() => this.handleClick()}>Confirm</button>
      </Page>
    );
  }
}

type LanguageButtonType = {
  lang: string,
  iso: string,
  switchLanguage: string => void
};

const LanguageButton = ({
  lang,
  iso,
  switchLanguage,
}: LanguageButtonType): Node => (
  <li onClick={(e: Event): void => switchLanguage(iso)}>
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
