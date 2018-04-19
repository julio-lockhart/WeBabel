import React from "react";
import styled from "styled-components";

// Components
import ChatMessage from "../ChatMessage";

const Container = styled.div`
  flex                  : 1;
  margin                : 16px;
  display               : -webkit-flex;
  -webkit-flex-direction: column-reverse;
  flex-direction        : column-reverse;
`;

const UnorderedList = styled.div`
  padding   : 0;
  margin    : 0 16px;
  overflow-y: auto;
`;

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
               <div>Empty List</div>
            )}
      </Container>
   );
};

export default ChatMessageList;
