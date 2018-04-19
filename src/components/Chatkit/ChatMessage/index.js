import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

const Container = styled.div`
   min-height : 100px;
   display    : flex;
   border-top : 1px solid #eeeeee;
   align-items: center;
   padding    : 8px 0px;

   flex-direction        : ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
   -webkit-flex-direction: ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
`;

const ImageContainer = styled.div`
  display        : flex;
  justify-content: center;
  width          : 120px;
  min-width      : 120px;
`;

const MessageContainer = styled.div`
word-break: break-word;
max-width : 40%;
`;

const AvatarImage = styled.img`
  height: 50px;
  width : 50px;
  float : left;
`;

const MessageDetails = styled.div`
  font-size: 0.749em;
  opacity  : 0.54;
  padding  : 8px 0px;

  text-align: ${props => props.isCurrentUser ? 'right' : 'left'};

  span {
    opacity: 1;
    color  : #0d47a1;
  }
`;

const MessageText = styled.div`
  font-size    : 0.998em;
  border-radius: 25px;
  padding      : 20px;
  display      : inline-block;
  float        : ${props => props.isCurrentUser === true ? 'right' : '#left'};

  background-color: ${props => props.isCurrentUser === true ? '#2196F3' : '#EEEEEE'};
  color           : ${props => props.isCurrentUser === true ? 'white' : 'black'};
`;

const ChatMessageList = ({ message = {}, user }) => {
   //console.log(message);

   const messageTimeStamp = message.createdAt;
   const senderId = message.senderId;
   const senderImage = message.userStore.store.store[senderId].avatarURL;
   const senderName = message.userStore.store.store[senderId].name;

   //console.log(messageTimeStamp, senderId, senderImage, senderName);
   //console.log(message);
   //console.log(user);
   //console.log("Same user", user.id === message.senderId);

   const isCurrentUser = user.id === message.senderId;

   return (
      <Container isCurrentUser={isCurrentUser}>
         <ImageContainer>
            <AvatarImage
               className="rounded-circle"
               src={
                  senderImage
                     ? senderImage
                     : "https://image.flaticon.com/icons/svg/149/149071.svg"
               }
            />
         </ImageContainer>

         <MessageContainer>
            <MessageDetails isCurrentUser={isCurrentUser}>
               {senderName}
               <span>{" | "}</span>
               <Moment format="LLL">{messageTimeStamp}</Moment>
            </MessageDetails>

            <MessageText isCurrentUser={isCurrentUser}>{message.text}</MessageText>
         </MessageContainer>
      </Container>
   );
};

export default ChatMessageList;
