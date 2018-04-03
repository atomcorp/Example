// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {changeLanguageIfNecessary} from '../../redux/actions/action-creators';
import translate from '../../config/text';
import type {TranslateType} from '../../types';

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
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentLang: this.props.language,
    };
    this.t = translate(this.state.currentLang);
    this.languages = [
      {
        lang: 'english',
        iso: 'en',
      },
      // {
      //   lang: 'French',
      //   iso: 'fr',
      // },
      // {
      //   lang: 'Spanish',
      //   iso: 'es',
      // },
      {
        lang: 'german',
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
        <h2>
          {
            translate(this.state.currentLang)('changeLanguage')
          } {this.props.language}
        </h2>
        <h4>{translate(this.state.currentLang)('chooseLanguage')}:</h4>
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
                iso={iso}
                t={translate(this.state.currentLang)} />
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
  switchLanguage: string => void,
  t: TranslateType
};

const LanguageButton = ({
  lang,
  iso,
  switchLanguage,
  t,
}: LanguageButtonType): Node => (
  <li onClick={(e: Event): void => switchLanguage(iso)}>
    {t(lang)}
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
