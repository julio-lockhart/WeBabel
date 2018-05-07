import React from 'react';
import Moment from 'react-moment';
import styled, { css } from 'styled-components';

// Styled Components
const RoomDetailContainer = styled.ul`
  width        : 100%;
  padding      : 0;
  margin       : 8px 0;
  border-bottom: 1px solid #CFD8DC;

  &:hover {
    background: #fafafa;
  }
`;

const RoomDetail = styled.div`
  height: 80px;
  width : 100%;
`;

const AvatarImage = styled.img`
  height: 50px;
  width : 50px;
  float : left;
`;

const Grid = styled.div`
  display        : flex;
  flex-wrap      : nowrap;
  flex-direction : row;
  justify-content: space-between;
`;

const DetailColumn = styled.div`
  display       : flex;
  flex-direction: column;

  ${props => {
      if (props.side === 'left') {
         return `
            margin-left: 8px;
            max-width  : 210px;
            flex: 1;
         `;
      } else if (props.side === 'right') {
         return `
            
         `;
      }
   }}
`;

const OverflowSpan = css`
   white-space  : nowrap;
   overflow     : hidden;
   text-overflow: ellipsis;
`;

const RoomNameStyle = styled.span`
   ${OverflowSpan};
   font-size: 1em;
`;

const LastMessageSentStyle = styled.span`
   ${OverflowSpan};
   margin-top: 8px;
   font-size : 0.749em;
   opacity   : 0.6;
`;

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