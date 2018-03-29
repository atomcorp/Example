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
  resource: [
    'Resource',
    'Ressource',
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
