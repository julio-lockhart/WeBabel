import Chatkit from '@pusher/chatkit'

// API Access
import { apiInstance } from '../constants/apiInstance';
import { INSTANCE_LOCATOR, TOKEN_PROVIDER_URL } from "../constants/constants";

export default async ({ state, actions }) => {
   return new Promise((resolve, reject) => {
      new Chatkit.ChatManager({
         tokenProvider: new Chatkit.TokenProvider({ url: TOKEN_PROVIDER_URL }),
         instanceLocator: INSTANCE_LOCATOR,
         userId: state.authUser.uid
      })
         .connect({
            onUserStartedTyping: actions.isTyping,
            onUserStoppedTyping: actions.notTyping,
            onAddedToRoom: actions.subscribeToRoom,
            onRemovedFromRoom: actions.removeRoom,
            onUserCameOnline: actions.setUserPresence,
            onUserWentOffline: actions.setUserPresence
         })
         .then(user => {
            // Subscribe to all rooms the user is a member of
            Promise.all(
               user.rooms.map(room =>
                  user.subscribeToRoom({
                     roomId: room.id,
                     hooks: { onNewMessage: actions.addMessage },
                     messageLimit: 100,
                  })
               )
            ).then(rooms => {
               actions.setUser(user)
               // Join the first room in the users room list
               user.rooms.length > 0 && actions.joinRoom(user.rooms[0])

               console.log("Successful Connection", user);
               resolve(true);
            });
         })
         .catch(error => {
            console.log('Error on connection', error);
            reject("error");
         });
   });
};

export const createUserOnChatkit = async (uid, displayName, avatarUrl = '') => {
   try {
      const res = await apiInstance({
         method: "POST",
         url: "/chatkit/createUser",
         data: {
            id: uid,
            displayName,
            avatarUrl
         }
      });

      return res;
   } catch (e) {
      console.log(e);
   }
};