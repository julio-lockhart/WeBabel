import { db } from './firebase';

// User API

export const doCreateUser = async (id, username, email) =>
   await db.ref(`users/${id}`).set({
      username,
      email,
   });

export const onceGetUsers = () =>
   db.ref('users').once('value');

export const getUserByEmail = (email) => {
   return new Promise((resolve, reject) => {
      db.ref('users').orderByChild("email").equalTo(email).on("value", function (snapshot) {
         const data = snapshot.val();

         if (data) {
            resolve(data);
         } else {
            reject(null);
         }
      });
   });
};

// Other db APIs ...
