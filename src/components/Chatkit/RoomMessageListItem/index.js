import React from 'react';
import Moment from 'react-moment';

// Styles
import {
   RoomDetailContainer, RoomDetail, AvatarImage, Grid, DetailColumn,
   RoomNameStyle, LastMessageSentStyle
} from './style.js';


const RoomMessageListItem = ({ roomDetail, actions }) => {
   this.joinRoom = (e) => {
      actions.joinRoom(roomDetail.room);
   }

   return (
      <RoomDetailContainer
         key={roomDetail.id}
         onClick={this.joinRoom}>

         <RoomDetail>
            <AvatarImage className="rounded-circle" src={roomDetail.avatar} />

            <Grid>
               <DetailColumn side="left">
                  <RoomNameStyle>{roomDetail.roomName}</RoomNameStyle>
                  <LastMessageSentStyle>{`${roomDetail.senderName}: ${roomDetail.latestMessage}`}</LastMessageSentStyle>
               </DetailColumn>

               <DetailColumn side="right">
                  <Moment
                     fromNow
                     style={{ fontSize: '.8em' }}>{roomDetail.timeStamp}</Moment>
               </DetailColumn>
            </Grid>
         </RoomDetail>
      </RoomDetailContainer>
   );
};

export default RoomMessageListItem;