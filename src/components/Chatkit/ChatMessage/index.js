import React, { Component } from "react";
import Moment from "react-moment";
import styled from "styled-components";

const Container = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #eeeeee;
  align-items: center;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
`;

const RightDiv = styled.div`
  flex-grow: 1;
`;

const AvatarImage = styled.img`
  height: 50px;
  width: 50px;
  float: left;
`;

const MessageDetails = styled.div`
  font-size: 0.749em;
  opacity: 0.54;

  span {
    opacity: 1;
    color: #0d47a1;
  }
`;

const MessageText = styled.div`
  font-size: 0.998em;
`;

const ChatMessageList = ({ message = {}, user }) => {
  //console.log(message);

  const messageTimeStamp = message.createdAt;
  const senderId = message.senderId;
  const senderImage = message.userStore.store.store[senderId].avatarURL;
  const senderName = message.userStore.store.store[senderId].name;

  //console.log(messageTimeStamp, senderId, senderImage, senderName);

  return (
    <Container>
      <LeftDiv>
        <AvatarImage
          className="rounded-circle"
          src={
            senderImage
              ? senderImage
              : "https://image.flaticon.com/icons/svg/149/149071.svg"
          }
        />
      </LeftDiv>

      <RightDiv>
        <MessageDetails>
          {senderName}
          <span>{" | "}</span>
          <Moment format="LLL">{messageTimeStamp}</Moment>
        </MessageDetails>

        <MessageText>{message.text}</MessageText>
      </RightDiv>
    </Container>
  );
};

export default ChatMessageList;
