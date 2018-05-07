import React from "react";

// Components
import RoomMessageListItem from '../RoomMessageListItem';

// Styles
import { Container, ContainerList } from './style.js';

const RoomMessageList = ({ rooms = [], user, messages, room, actions }) => {

   let roomHeaders = [];
   rooms.forEach(room => {
      const roomName = room.name;

      // All Message Keys associated with a room
      const messageKeys = Object.keys(messages[room.id] || {});

      // Last message is the message with the largest id number
      const oldestMessageIdReceived = Math.max(...messageKeys);

      if (isFinite(oldestMessageIdReceived)) {

         // ID of sender
         const senderId = messages[room.id][oldestMessageIdReceived].senderId;

         // Name of sender
         const senderName =
            senderId === user.id
               ? "You"
               : messages[room.id][oldestMessageIdReceived].userStore.store.store[
                  senderId
               ].name;

         // Last message that was sent
         const latestMessage = messages[room.id][oldestMessageIdReceived].text;

         // Message time stamp
         const messageTimeStamp = messages[room.id][oldestMessageIdReceived].createdAt;

         // If current user has an image, display it, otherwise, show 
         // temp user image
         const currentUserAvatar = user.avatarURL
            ? user.avatarURL
            : "https://image.flaticon.com/icons/svg/149/149071.svg";

         // URL of sender image
         const senderAvatar =
            messages[room.id][oldestMessageIdReceived].userStore.store.store[
               senderId
            ].avatarURL;

         // Same concept as 'currentUserAvatar'
         const avatar =
            senderId === user.id
               ? currentUserAvatar
               : senderAvatar
                  ? senderAvatar
                  : "https://image.flaticon.com/icons/svg/149/149071.svg";

         const roomDetail = {
            room: room,
            avatar,
            roomName,
            senderName,
            latestMessage,
            timeStamp: messageTimeStamp
         };

         roomHeaders.push(
            <RoomMessageListItem key={room.id} roomDetail={roomDetail} actions={actions} />
         );

      } else {
         const createdByUserId = room.createdByUserId;
         const creatorAvatar = room.userStore.store.store[createdByUserId].avatarURL;
         const createdAtTimestamp = room.createdAt;

         const roomDetail = {
            room: room,
            avatar: creatorAvatar ? creatorAvatar : "https://image.flaticon.com/icons/svg/149/149071.svg",
            roomName,
            senderName: "",
            latestMessage: "",
            timeStamp: createdAtTimestamp
         };

         roomHeaders.push(
            <RoomMessageListItem key={room.id} roomDetail={roomDetail} actions={actions} />
         );
      }
   });

   return (
      <Container>
         <ContainerList>{roomHeaders}</ContainerList>
      </Container>
   );
};

export default RoomMessageList;
