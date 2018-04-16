import React, { Component } from 'react';
import styled from 'styled-components';
import ChatMessage from '../ChatMessage';

const Container = styled.div`
   flex                  : 1;
   margin                : 16px;
   display               : -webkit-flex;
   -webkit-flex-direction: column;
   flex-direction        : column;

   ul {
      overflow-y: scroll;
   }
`;

const ChatMessageList = ({ messages = {}, user }) => {
   let chatMessages = [];

   Object.keys(messages)
      .reverse()
      .map((k, id) => {
         chatMessages.push(
            <li key={id}>
               {
                  <ChatMessage user={user} message={messages[k]} />
               }
            </li>
         )
      });

   return (
      <Container>
         {
            Object.keys(messages).length > 0 ? <ul>{chatMessages}</ul> : <div>Empty List</div>
         }
      </Container>
   );
}

export default ChatMessageList;