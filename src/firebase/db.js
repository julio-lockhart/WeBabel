import { db } from './firebase';

// User API

export const doCreateUser = async (id, username, email) =>
  await db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
