import React from "react";

// Components
import ChatMessage from "../ChatMessage";

// Styles
import { Container, UnorderedList, EmptyListContainer } from './style.js';

const ChatMessageList = ({ messages = {}, user }) => {
   let chatMessages = Object.keys(messages).map(k => {
      return (<ChatMessage key={messages[k].id} user={user} message={messages[k]} />)
   });

   return (
      <Container>
         {Object.keys(messages).length > 0 ? (
            <UnorderedList>
               {chatMessages}
            </UnorderedList>
         ) : (
               <EmptyListContainer>
                  <img src="https://png.icons8.com/flat_round/50/000000/file.png" alt="Empty Icon" />
                  <p className="my-3">No messages to show! Send a message below.</p>
               </EmptyListContainer>
            )}
      </Container>
   );
};

export default ChatMessageList;
