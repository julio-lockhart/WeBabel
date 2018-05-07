import React from 'react';

import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

// Styles
import { Container, UnorderedList, Header, ListItem, PresenceIndicator } from './style.js';

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