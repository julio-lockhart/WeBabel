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

const EmptyListContainer = styled.div`
   display        : flex;
   align-items    : center;
   justify-content: center;
   flex-direction : column;
   height         : 100vh;
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
               <EmptyListContainer>
                  <img src="https://png.icons8.com/flat_round/50/000000/file.png" alt="Empty Icon" />
                  <p className="my-3">No messages to show! Send a message below.</p>
               </EmptyListContainer>
            )}
      </Container>
   );
};

export default ChatMessageList;
