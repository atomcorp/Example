import {firebaseAuth} from './firebase';

export const signUp = (email, password) =>
  firebaseAuth.createUserWithEmailAndPassword(email, password);

// Why not use signInWithEmailAndPassword?
// "This method will be renamed to signInWithEmailAndPassword
// replacing the existing method with the same name in the
// next major version change."
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInAndRetrieveDataWithEmailAndPassword
export const signIn = (email, password) =>
  firebaseAuth.signInAndRetrieveDataWithEmailAndPassword(email, password);

export const signOut = () =>
  firebaseAuth.signOut();

export const passwordReset = (email) =>
  firebaseAuth.sendPasswordResetEmail(email);

export const passwordUpdate = (password) =>
  firebaseAuth.currentUser.updatePassword(password);

export const getCurrentUser = () =>
  firebaseAuth.currentUser;

export const onLogin = (callback) =>
  firebaseAuth.onAuthStateChanged((user) => callback(user));

