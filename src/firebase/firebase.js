import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyCScBol1J0HR_R4fauHtqBAmAkR0PQZ8Ik",
  authDomain: "react-firebase-tutorial-49ed8.firebaseapp.com",
  databaseURL: "https://react-firebase-tutorial-49ed8.firebaseio.com",
  projectId: "react-firebase-tutorial-49ed8",
  storageBucket: "",
  messagingSenderId: "862034296557"
};

if (!firebase.apps.length) {
  firebase.initializeApp(prodConfig);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth
};
