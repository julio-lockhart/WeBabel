import * as firebase from 'firebase';

const prodConfig = {
   apiKey: "AIzaSyBlHMeyWxVnrhr_RTGaAJe0isSisXPOtV8",
   authDomain: "react-chat-d15a9.firebaseapp.com",
   databaseURL: "https://react-chat-d15a9.firebaseio.com",
   projectId: "react-chat-d15a9",
   storageBucket: "react-chat-d15a9.appspot.com",
   messagingSenderId: "912516577106"
};

if (!firebase.apps.length) {
   firebase.initializeApp(prodConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
   db,
   auth,
   firebase,
   googleProvider,
   facebookProvider
};
