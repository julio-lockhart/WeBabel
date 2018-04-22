import React from 'react';
import styled from 'styled-components';

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

const RoomUserList = ({ room }) => {
   return (
      <Container>
         <Header>Users</Header>
         <UnorderedList>
            {
               room.users && room.users.map(user => (
                  <ListItem key={user.id}>
                     <img src={user.avatarURL ? user.avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg"} alt={user.name} />
                     <span>{user.name}</span>
                     <PresenceIndicator isUserOnline={user.presence.state === "online" ? true : false} />
                  </ListItem>
               ))}
         </UnorderedList>
      </Container>
   );
}

export default RoomUserList;