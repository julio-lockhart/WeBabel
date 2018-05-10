import React from "react";
import Moment from "react-moment";
import Linkify from 'react-linkify';

// Styles
import {
   Container, ImageContainer, MessageContainer, AvatarImage,
   MessageDetails, MessageText, PresenceIndicator, CustomMicrolinkCard
} from './style.js';

const ChatMessageList = ({ message = {}, user }) => {
   const messageTimeStamp = message.createdAt;
   const senderId = message.senderId;
   const senderImage = message.userStore.store.store[senderId].avatarURL;
   const senderName = message.userStore.store.store[senderId].name;
   const isUserOnline = message.sender.presence.state === 'online' ? true : false;
   const isCurrentUser = user.id === message.senderId;
   const messageURLsArray = [...message.urls];

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

               {
                  !isCurrentUser ? (<PresenceIndicator
                     className="mx-2"
                     isUserOnline={isUserOnline} />) : null
               }

               {senderName}
               <span>{" | "}</span>
               <Moment format="LLL">{messageTimeStamp}</Moment>

               {
                  isCurrentUser ? (<PresenceIndicator
                     className="mx-2"
                     isUserOnline={isUserOnline} />) : null
               }

            </MessageDetails>

            <MessageText isCurrentUser={isCurrentUser}>
               <Linkify properties={{ target: '_blank', style: { color: 'white', fontWeight: 'bold' } }}>{message.text}</Linkify>
            </MessageText>

            {
               messageURLsArray.length > 0 ?
                  <div>
                     <CustomMicrolinkCard
                        target='_blank'
                        url={messageURLsArray[0]} />
                  </div> : null
            }
         </MessageContainer>
      </Container>
   );
};

export default ChatMessageList;
