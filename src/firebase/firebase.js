import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCdkE903n9AV5i7Z9MU9ArriTOD9yHFLBU',
  authDomain: 'learn-54603.firebaseapp.com',
  databaseURL: 'https://learn-54603.firebaseio.com',
  projectId: 'learn-54603',
  storageBucket: 'learn-54603.appspot.com',
  messagingSenderId: '1000835758153',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firebaseAuth = firebase.auth();
export const database = firebase.database();

// check user signed in
// if (auth.default.currentUser) {
//   console.log(auth.currentUser);
// } else {
//   console.log('Signout');
// }
