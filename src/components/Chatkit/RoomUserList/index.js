import React from 'react';
import styled from 'styled-components';

import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const Container = styled.div`
  display       : flex;
  flex-direction: column;
  align-items   : center;
  list-style    : none;
  background    : #fff;
  overflow-y    : scroll;
  border-left   : 1px solid rgba(0, 0, 0, 0.1);
  width         : 300px;
`;

const UnorderedList = styled.div`
  padding   : 0;
  margin    : 0 16px;
  overflow-y: auto;
`;

const Header = styled.h3`
   color          : gray;
   align-items    : center;
   justify-content: center;
   margin-top     : 16px;
`;

const ListItem = styled.li`

   align-items  : center;
   color        : rgba(0, 0, 0, 0.38);
   font-weight  : bold;
   font-size    : 1rem;
   padding      : 1rem;
   cursor       : pointer;
   width        : 250px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.1);

   img {
      width: 40px;
      height: 40px;
      border-radius: 0.1rem;
      margin-right: 0.62rem;
   }
`;

const PresenceIndicator = styled.div`

   width                : 8px;
   height               : 8px;
   -moz-border-radius   : 8px;
   -webkit-border-radius: 8px;
   border-radius        : 8px;
   margin-top           : 16px;
   margin-right         : 16px;
   float                : right;
   
   background           : ${props => props.isUserOnline ? 'lightgreen' : 'gray'};
`;

const RoomUserList = ({ user, room, createConvo, removeUserFromRoom }) => {
   this.onStartNewMessageClick = ({ event, ref, data, dataFromProvider }) => {
      if (dataFromProvider.id !== user.id) {
         createConvo({ user: dataFromProvider });
      }
   };

   this.onRemoveUserClick = ({ event, ref, data, dataFromProvider }) => {
      if (dataFromProvider.id !== user.id) {
         removeUserFromRoom({ userId: dataFromProvider.id });
      }
   };

   const RoomContextMenu = ({ dataFromProvider }) => (
      <ContextMenu id='menu_id'>
         <Item onClick={this.onStartNewMessageClick}>Start New Message</Item>
         <Item onClick={this.onRemoveUserClick}>Remove User</Item>
      </ContextMenu>
   );

   return (
      <Container>
         <Header>Users</Header>
         <UnorderedList>
            {
               room.users && room.users.map(roomUserID => (
                  <ListItem key={roomUserID.id}>
                     <ContextMenuProvider data={roomUserID} id="menu_id">
                        <img src={roomUserID.avatarURL ? roomUserID.avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg"} alt={roomUserID.name} />
                        <span>{roomUserID.name}</span>
                        <PresenceIndicator isUserOnline={roomUserID.presence.state === "online" ? true : false} />
                     </ContextMenuProvider>
                     <RoomContextMenu />
                  </ListItem>
               ))}
         </UnorderedList>
      </Container>
   );
}

export default RoomUserList;