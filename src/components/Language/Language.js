// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {changeLanguageIfNecessary} from '../../redux/actions/action-creators';

type PropsType = {
  language: string,
  changeLanguage: string => void
};

type StateType = {
  currentLang: string
};

class Language extends Component<PropsType, StateType> {
  languages: Array<{
    lang: string,
    iso: string
  }>
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentLang: this.props.language,
    };
    this.languages = [
      {
        lang: 'English',
        iso: 'en',
      },
      {
        lang: 'French',
        iso: 'fr',
      },
      {
        lang: 'Spanish',
        iso: 'es',
      },
      {
        lang: 'German',
        iso: 'de',
      },
    ];
  }
  handleClick() {
    this.props.changeLanguage(this.state.currentLang);
  }
  switchLanguage = (iso: string) => {
    this.setState({
      currentLang: iso,
    });
  }
  render(): * {
    return (
      <Page>
        <h2>Current site language is {this.props.language}</h2>
        <h3>Current page lang is {this.state.currentLang}</h3>
        <h4>Please choose a language: </h4>
        <ul>
          {
            this.languages.map(({
                lang, iso,
              }: {lang: string, iso: string},
              i: number
            ): Node => (
                <LanguageButton
                  key={i}
                  switchLanguage={this.switchLanguage}
                  lang={lang}
                  iso={iso} />
            ))
          }
        </ul>
        <button onClick={(): void => this.handleClick()}>Confirm</button>
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
  ): void => dispatch(changeLanguageIfNecessary(language)),
});

const LanguageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);

export default LanguageContainer;
