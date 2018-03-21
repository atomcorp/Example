import auth from './firebase';

export const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Why not use signInWithEmailAndPassword?
// "This method will be renamed to signInWithEmailAndPassword
// replacing the existing method with the same name in the
// next major version change."
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInAndRetrieveDataWithEmailAndPassword
export const signIn = (email, password) =>
  auth.signInAndRetrieveDataWithEmailAndPassword(email, password);

export const signOut = () =>
  auth.signOut();

export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const passwordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
