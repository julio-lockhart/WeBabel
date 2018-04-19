import React from "react";
import styled from 'styled-components';

// Components
import RoomMessageListItem from '../RoomMessageListItem';

// Styled Components
const Container = styled.div`
  margin                : 8px;
  display               : -webkit-flex;
  -webkit-flex-direction: column;
  flex-direction        : column;
`;

const ContainerList = styled.ul`
  flex        : 1 1 auto;
  -webkit-flex: 1 1 auto;
  overflow-y  : auto;
  min-height  : 0px;
  padding     : 0;
  margin      : 0;
`;

// const RoomDetailContainer = styled.ul`
//   width        : 100%;
//   padding      : 0;
//   margin       : 8px 0;
//   border-bottom: 1px solid #CFD8DC;

//   &:hover {
//     background: #fafafa;
//   }
// `;

// const RoomDetail = styled.div`
//   height: 80px;
//   width : 100%;
// `;

// const AvatarImage = styled.img`
//   height: 50px;
//   width : 50px;
//   float : left;
// `;

// const Grid = styled.div`
//   display        : flex;
//   flex-wrap      : nowrap;
//   flex-direction : row;
//   justify-content: space-between;
// `;

// const DetailColumn = styled.div`
//   display       : flex;
//   flex-direction: column;

//   ${props => {
//       if (props.side === 'left') {
//          return `
//             margin-left: 8px;
//             max-width  : 210px;
//             flex: 1;
//          `;
//       } else if (props.side === 'right') {
//          return `

//          `;
//       }
//    }}
// `;

// const OverflowSpan = css`
//    white-space  : nowrap;
//    overflow     : hidden;
//    text-overflow: ellipsis;
// `;

// const RoomNameStyle = styled.span`
//    ${OverflowSpan};
//    font-size: 1em;
// `;

// const LastMessageSentStyle = styled.span`
//    ${OverflowSpan};
//    margin-top: 8px;
//    font-size : 0.749em;
//    opacity   : 0.6;
// `;

const RoomMessageList = ({ rooms = [], user, messages, room, actions }) => {

   //console.log('rooms', rooms);

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
