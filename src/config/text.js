// 1. en,
// 2. de
const text = {
  title: [
    'Learn',
    'Lernen',
  ],
  chooseCourse: [
    'Choose a course',
    'Wählen Sie einen Kurs',
  ],
  course: [
    'Course',
    'Kurs',
  ],
  about: [
    'About',
    'Über',
  ],
  signIn: [
    'Sign in',
    'Anmelden',
  ],
  signOut: [
    'Sign out',
    'Ausloggen',
  ],
  register: [
    'Register',
    'Registrieren',
  ],
  email: [
    'Email',
    'Email',
  ],
  password: [
    'Password',
    'Passwort',
  ],
  confirmPassword: [
    'Confirm password',
    'Bestätige das Passwort',
  ],
  loggingIn: [
    'Logging in...',
    'Einloggen',
  ],
  complete: [
    'Complete',
    'Komplett',
  ],
  resources: [
    'Resource',
    'Ressource',
  ],
  previous: [
    'Previous',
    'Bisherige',
  ],
  next: [
    'Next',
    'Nächster',
  ],
  selectAnswer: [
    'Select an answer',
    'Wählen Sie eine Antwort aus',
  ],
  changeLanguage: [
    'Change language',
    'Sprache ändern',
  ],
  chooseLanguage: [
    'Please choose a language',
    'Bitte wähle eine Sprache',
  ],
  english: [
    'English',
    'Englisch',
  ],
  german: [
    'German',
    'Deutsche',
  ],
  confirm: [
    'Confirm',
    'Bestätigen',
  ],
  languageHelp: [
    'Press confirm to save your changes',
    'Drücken Sie bestätigen, um Ihre Änderungen zu speichern',
  ],
  txtErr: [
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
  ],
};

const translate = (lang) => {
  switch (lang) {
    case 'de':
      return (string) => isString(string)[1];
    case 'en':
    default:
      return (string) => isString(string)[0];
  }
};

const isString = (string) => text[string] ? text[string] : text['txtErr'];

export default translate;
