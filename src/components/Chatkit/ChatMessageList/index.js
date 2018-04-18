import React, { Component } from "react";
import styled from "styled-components";
import ChatMessage from "../ChatMessage";

const Container = styled.div`
  flex: 1;
  margin: 16px;
  display: -webkit-flex;
  -webkit-flex-direction: column-reverse;
  flex-direction: column-reverse;

  ul {
    overflow-y: auto;
  }
`;

const UnorderedList = styled.div`
  padding: 0;
  margin: 0 16px;
`;

const ChatMessageList = ({ messages = {}, user }) => {
  let chatMessages = [];

  Object.keys(messages).map((k, id) => {
    chatMessages.push(
      <div key={id}>{<ChatMessage user={user} message={messages[k]} />}</div>
    );
  });

  return (
    <Container>
      {Object.keys(messages).length > 0 ? (
        <UnorderedList>{chatMessages}</UnorderedList>
      ) : (
        <div>Empty List</div>
      )}
    </Container>
  );
};

export default ChatMessageList;
