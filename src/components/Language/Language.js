import React from 'react';
import {addToLocalStorage} from '../../utility/utility';

const handleClick = (iso) => {
  addToLocalStorage('lang', iso);
};

const Language = () => (
  <div>
    <h2>Please choose a language: </h2>
    <ul>
      <LanguageButton lang="English" iso="en" />
      <LanguageButton lang="French" iso="fr" />
      <LanguageButton lang="Spanish" iso="es" />
      <LanguageButton lang="German" iso="de" />
    </ul>
    <button>Start</button>
  </div>
);

const LanguageButton = ({lang, iso}) => (
  <li onClick={(e) => handleClick(iso)}>
    {lang}
  </li>
);

export default Language;
