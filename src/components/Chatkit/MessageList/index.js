import React from 'react';
import styled from 'styled-components';

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
`;

const EmptyMessageList = (
   <div>Empty list</div>
);

const MessageList = ({ rooms = [], user, messages, currentRoom, actions }) => {

   let roomGroupItems = [];
   rooms.map((room) => {

      const roomId = room.id;
      const messageKeys = Object.keys(messages[roomId] || {});
      const latestMessage = messageKeys.length > 0 && messages[room.id][messageKeys.pop()];
      const firstUser = room.users.find(x => x.id !== user.id);

      console.log('Room', room);
      console.log('latestMessage', latestMessage, latestMessage.text);
      console.log('messageKeys', messageKeys);

      roomGroupItems.push(
         <li>{latestMessage.key}</li>
      )
   });


   return (
      <Container>
         <ContainerList>
            {
               rooms.map((room) => {

                  const roomId = room.id;
                  const messageKeys = Object.keys(messages[roomId] || {});
                  const latestMessage = messageKeys.length > 0 && messages[room.id][messageKeys.pop()];
                  const firstUser = room.users.find(x => x.id !== user.id);

                  console.log('Room', room);
                  console.log('latestMessage', latestMessage, latestMessage.text);
                  console.log('messageKeys', messageKeys);

                  return <li>{latestMessage.key}</li>;
               })
            }
         </ContainerList>
      </Container>
   );
}

export default MessageList;