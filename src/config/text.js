// 1. en, 2. de
const text = {
  title: [
    'Learn',
    'Lernen'
  ],
  chooseCourse: [
    'Choose a course',
    'Wählen Sie einen Kurs',
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
};

const translate = (lang) => {
  switch(lang) {
    case 'de':
      return (string) => text[string][1];
    case 'en':
    default:
      return (string) => text[string][0];
  }
};

export default translate;
